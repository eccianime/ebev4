AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );

$("[type=file]").change(function() {
	var v = $(this).prop("files")[0]['name'];
	var n = $(this).attr("name");

	$("label[for="+n+"]").html(v);
	$("label[for="+n+"]").css({color:"black", wordBreak: "break-all"});
})

function buscarUsuario() {
	var u = {
		co_usuario: $("[name=tx_nick]").val(),
		tx_nick: $("[name=tx_nick]").val(),
	}

	if( u.co_usuario == "" ){
		abrirModal(1, "Primero escriba la ID o el nick del usuario.");
	}else{
		AJAX( "buscarUsuario", llenarUsuario, errorConn, u );	
	}
}

function llenarUsuario( datos ) {
	if( datos.datos.length > 0 ){
		var d = datos.datos[0];
		$("[name=co_usuario]").val( d.co_usuario );
		$("[name=tx_nombre]").val( d.tx_nombre );
		$("[name=tx_nombre_2]").val( d.tx_nombre_2 );
		$("[name=tx_apellido]").val( d.tx_apellido );
		$("[name=tx_apellido_2]").val( d.tx_apellido_2 );
		$("[name=tx_cedula]").val( d.tx_cedula );
	}else{
		abrirModal( 1, "Disculpe el usuario buscado no existe." );
	}
}

function registroAsis() {
	if( $("[name=tx_nick]").val() == "" ||
		$("[name=tx_nombre]").val() == "" || 
		$("[name=tx_nombre_2]").val() == "" ||
		$("[name=tx_nombre_2]").val() == "" ||
		$("[name=tx_nombre_2]").val() == "" ||
		$("[name=url_img_firma]").val() == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		mostrarCargando();

		var fd = new FormData();
		var file1 = $('[name=url_img_firma]')[0].files[0]; 
        fd.append('archivo', file1);

        fd.append( 'co_usuario', $("[name=co_usuario]").val() );
		fd.append( 'co_sucursal', $("[data-co_sucursal]").val() );
        fd.append( 'co_creado_por', usuario.co_usuario);

		$.ajax({
			type: 'post',
			url: URL_BASE+"registroLibroAsis",
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
					abrirModal(2, "Ocurrió un problema, informe al administrador el CODIGO ERR0003");
				}
			},
		});
	}
}