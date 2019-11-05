CORS( URL_BASE+"?accion=verEmpresaSucursal", "llenarEmpresaSucursal", errorConn, usuario );
obtenerUbicacion( ".caja", "[name=nu_lat_lng]" );

$("[type=file]").change(function() {
	var v = $(this).prop("files")[0]['name'];
	var n = $(this).attr("name");

	$("label[for="+n+"]").html(v);
	$("label[for="+n+"]").css({color:"black", wordBreak: "break-all"});
})


function registro() {
	if( $("[name=tx_descripcion]").val() == "" ||
		$("[name=tx_adjunto]").val() == "" || 
		$("[name=nu_lat_lng]").val() == "" ||
		$("[name=url_img_firma]").val() == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		mostrarCargando();

		var urlregistro = URL_BASE+"?accion=registroBitac";

		var fd = new FormData();
		var file1 = $('[name=tx_adjunto]')[0].files[0]; 
        fd.append('archivo', file1);
        fd.append('tx_descripcion', $("[name=tx_descripcion]").val());
        fd.append('nu_lat_lng', $("[name=nu_lat_lng]").val());
        fd.append('co_sucursal', $("[data-co_sucursal]").val());
        fd.append('co_usuario', usuario.co_usuario);

        var fd2 = new FormData();
		var file2 = $('[name=url_img_firma]')[0].files[0]; 
        fd2.append('archivo', file2);
        fd2.append('co_usuario', usuario.co_usuario);

		$.ajax({
			type: 'post',
			url: urlregistro,
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			data: fd,
			complete: function ( xhr, status ) {
				var resp = $.parseJSON( xhr.responseText );
				fd2.append('co_libro', resp.last_id);
				
				if( resp.success == true ){
					$.ajax({
						type: 'post',
						url: urlregistro,
						contentType: false,
						enctype: 'multipart/form-data',
						processData: false,
						cache: false,
						data: fd2,
						complete: function( xhr, status) {
							var resp = $.parseJSON( xhr.responseText );
							quitarCargando();
							if( resp.success == true ){
								abrirModal(2, "salio bien");
							}else{
								abrirModal(2, "salio mal2");
							}
						}
					});	
				}else{
					quitarCargando();	
					abrirModal(1, "salio mal1");
				}
			},
		});


		    /*var file_id = "[name=tx_adjunto]";
		    var file_name_arr = new Array();
		    var process_path = 'public/uploads/';

		    for (i = 0; i < $(file_id).prop("files").length; i++) {

		        var form_data = new FormData();
		        var file_data = $(file_id).prop("files")[i];
		        form_data.append("file_name", file_data);

	            $.ajax({
	                cache: false,
	                contentType: false,
	                processData: false,
	                async: false,
	                data: form_data,
	                type: 'post',
	                url: "http://localhost/ebetracking/webservice.php?accion=subirImagen",
					dataType: "jsonp",
					crossDomain: true,
					jsonpCallback: 'funciono',
	            });

		    }*/

		/*$.ajax({
			type: "POST",
			//url: "http://appevt.zz.com.ve/webservice.php"+url,
			url: "http://localhost/ebetracking/webservice.php?accion=registro",
			data: {

			},			
			dataType: "jsonp",
			crossDomain: true,
			jsonpCallback: respuesta,
		});*/
	}

}