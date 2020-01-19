$(function() {
	$("[name=co_rol]").change(function() {
		console.log( $(this).find(':selected').attr("value") );
		if( $(this).find(':selected').attr("value") == "2" ){
			$("[name=co_org] option[value='']")
				.attr("selected", true)
				.siblings().attr("selected",false);
			
			$("[name=co_org]").closest(".ui-select").addClass("ui-disabled");
			$("[name=co_org]").selectmenu().selectmenu("refresh",true);
		}else{
			$("[name=co_org] option[value='"+usr['co_sucursal']+"']")
				.attr("selected", true)
				.siblings().attr("selected",false);
			
			$("[name=co_org]").closest(".ui-select").removeClass("ui-disabled");			
			$("[name=co_org]").selectmenu().selectmenu("refresh",true);
		}
	})	
})

function editarUsuario() {
	var data = {
		co_usuario: $('[name=co_usuario]').val(),
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
			if( data['co_rol'] == 2 ){
				data["co_org"] = usuario.co_empresa
			}else if( data['co_rol'] == 3 ){
				data["co_org"] = $('[name=co_org] option:selected').attr('value');
			}
			AJAX( "editarUsuario", rspBase, errorConn, data );
		}
	}	
}	