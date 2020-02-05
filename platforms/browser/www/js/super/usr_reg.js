$(function() {
	AJAX( "verEmpresas", verEmpresasRSP, errorConn );

	$("[name=co_rol]").change(function() {
		if( $(this).find(':selected').attr("value") == "1" ){
			$("[name=co_org] option[value='']")
				.attr("selected", true)
				.siblings().attr("selected",false);
			
			$("[name=co_org]").closest(".ui-select").addClass("ui-disabled");
			$("[name=co_org]").selectmenu().selectmenu("refresh",true);
		}else{
			$("[name=co_org] option[value='']")
				.attr("selected", true)
				.siblings().attr("selected",false);
			
			$("[name=co_org]").closest(".ui-select").removeClass("ui-disabled");			
			$("[name=co_org]").selectmenu().selectmenu("refresh",true);
		}
	})	
})

function verEmpresasRSP( datos ) {
	if( datos.filas > 0 ){
		var html 		= "";
		var empresas 	= datos.datos;
		$.each( empresas , function( i ) {
			html += "<option value="+empresas[i]['co_empresa']+">"+empresas[i]['tx_empresa']+"</option>"
		});
		$("[name=co_org]").append( html );
	}
}

function registrarUsuario() {
	var data = {
		tx_cedula:    	$('[name=tx_cedula]').val(),
		tx_nick:      	$('[name=tx_nick]').val(),
		tx_nombre:    	$('[name=tx_nombre]').val(),
		tx_nombre_2:  	$('[name=tx_nombre_2]').val(),
		tx_apellido:  	$('[name=tx_apellido]').val(),
		tx_apellido_2:	$('[name=tx_apellido_2]').val(),
		tx_email:     	$('[name=tx_email]').val(),
		tx_tlf:       	$('[name=tx_tlf]').val(),
		fe_nacimiento:	$('[name=fe_nacimiento]').val(),
		co_sexo:      	$('[name=co_sexo] option:selected').attr('value'),
		co_rol:       	$('[name=co_rol] option:selected').attr('value'),
		co_org:   		$('[name=co_org] option:selected').attr('value'),
		tx_pass:      	$('[name=tx_pass]').val(),
		tx_pass_2:    	$('[name=tx_pass_2]').val(),
	}
	var vacios = 0;

	$("[required=true]").each(function( i ) {
		if( $(this).val() == "" ) vacios++;
	})

	if ( vacios > 0 ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else if( data.tx_pass != data.tx_pass_2 ){
		abrirModal( 1, "Las constraseñas no coinciden, por favor verifique..." );
	}else if( data.co_rol == 2 && data.co_org == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else {
		data["co_creado_por"] = usuario.co_usuario;
		AJAX( "registrarUsuario", rspBase, errorConn, data );		
	}
}