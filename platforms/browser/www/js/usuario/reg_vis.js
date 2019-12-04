AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );

$("[type=file]").change(function() {
	var v = $(this).prop("files")[0]['name'];
	var n = $(this).attr("name");

	$("label[for="+n+"]").html(v);
	$("label[for="+n+"]").css({color:"black", wordBreak: "break-all"});
})

function registroVis() {

	if ( $('[name=tx_cedula]').val() == "" ||
		$('[name=tx_nombre]').val() == "" ||
		$('[name=tx_nombre_2]').val() == "" ||
		$('[name=tx_apellido]').val() == "" ||
		$('[name=tx_apellido_2]').val() == "" ||
		$('[name=tx_empresa]').val() == "" ||
		$('[name=tx_destino]').val() == "" ||
		$('[name=url_img_firma]').val() == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		mostrarCargando();

		var fd = new FormData();
		var file1 = $('[name=url_img_firma]')[0].files[0]; 
        fd.append('archivo', file1);
		fd.append( 'co_sucursal', $("[data-co_sucursal]").val() );
        fd.append( 'co_creado_por', usuario.co_usuario);
        fd.append( 'co_usuario', usuario.co_usuario);

		fd.append( 'tx_cedula', $('[name=tx_cedula]').val() );
		fd.append( 'tx_nombre', $('[name=tx_nombre]').val() );
		fd.append( 'tx_nombre_2', $('[name=tx_nombre_2]').val() );
		fd.append( 'tx_apellido', $('[name=tx_apellido]').val() );
		fd.append( 'tx_apellido_2', $('[name=tx_apellido_2]').val() );
		fd.append( 'tx_empresa', $('[name=tx_empresa]').val() );
		fd.append( 'tx_destino', $('[name=tx_destino]').val() );

		$.ajax({
			type: 'post',
			url: URL_BASE+"registroLibroVis",
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			data: fd,
			complete: function ( xhr, status ) {
				var resp = $.parseJSON( xhr.responseText );
				quitarCargando();
				if( resp.success == true ){
					abrirModal(2, "Se realizó el registro de forma exitósa.", 1);
				}else{
					abrirModal(2, "Ocurrió un problema, informe al administrador el CODIGO ERR0004");
				}
			},
		});
	}	
}