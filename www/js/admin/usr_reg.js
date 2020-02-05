$(function() {
	AJAX( "verSucursalesGral", selectAdmPto, errorConn, empresa );

	$("[name=co_rol]").change(function() {
		if( $(this).find(':selected').attr("value") == "2" ){
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

function selectAdmPto( datos ) {
	if( datos.filas > 0 ){
		var html 	= "";
		sucursales_ptos 	= datos.datos;
		$.each( sucursales_ptos , function( i ) {
			html += "<option value="+sucursales_ptos[i]['co_sucursal']+">"+sucursales_ptos[i]['tx_sucursal']+"</option>"
		})
		$("[name=co_org]").append( html );
	}
}

function registrarUsuario() {
	var data = {
		tx_cedula: $('[name=tx_cedula]').val(),
		tx_nick: $('[name=tx_nick]').val(),
		tx_nombre: $('[name=tx_nombre]').val(),
		tx_nombre_2: $('[name=tx_nombre_2]').val(),
		tx_apellido: $('[name=tx_apellido]').val(),
		tx_apellido_2: $('[name=tx_apellido_2]').val(),
		tx_email: $('[name=tx_email]').val(),
		co_rol: $('[name=co_rol] option:selected').attr('value')
	}
	var vacios = 0;
	$.each( data, function( i ) {
		if( data[i] == "" ) vacios++;
	})

	if ( vacios > 0 ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		if( $('[name=co_rol] option:selected').attr('value') == 3 &&
			$('[name=co_org] option:selected').attr('value') == "" ){
			abrirModal( 1, "Por favor, no deje campos vacíos..." );	
		}else{
			data["co_creado_por"] = usuario.co_usuario;
			if( data['co_rol'] == 2 ){
				data["co_org"] = empresa.co_empresa;
			}else if( data['co_rol'] == 3 ){
				data["co_org"] = $('[name=co_org] option:selected').attr('value');
			}
			AJAX( "registrarUsuario", rspBase, errorConn, data );		
			
		}
	}	
}