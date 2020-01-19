$(function() {
	obtenerUbicacion( ".caja", "[name=nu_lat_lng]" );
	
	$("[type=file]").change(function() {
		var v = $(this).prop("files")[0]['name'];
		var n = $(this).attr("name");

		$("label[for="+n+"]").html(v);
		$("label[for="+n+"]").css({color:"black", wordBreak: "break-all"});
	})
	
})

function registroNota() {
	if( $("[name=tx_descripcion]").val() == "" ||
		$("[name=tx_adjunto]").val() == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		mostrarCargando();

		var fd = new FormData();
		var file1 = $('[name=tx_adjunto]')[0].files[0]; 
        fd.append('archivo', file1);
        fd.append('tx_descripcion', $("[name=tx_descripcion]").val());
        fd.append('nu_lat_lng', $("[name=nu_lat_lng]").val());
        fd.append('co_libro_bit', libro.co_libro_bit );
        fd.append('co_creado_por', usuario.co_usuario);

        $.ajax({
			type: 'post',
			url: URL_BASE+"registroNota",
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			data: fd,
			complete: function ( xhr, status ) {
				var resp = $.parseJSON( xhr.responseText );
				quitarCargando();	
				if( resp.success == true ){
					abrirModal( 2 , "Nota cargada con exito" , 1 );
				}else{
					abrirModal(1, "Ocurrió un problema, informe al administrador el CODIGO ERR0005");
				}
			},
		});
	}
}
