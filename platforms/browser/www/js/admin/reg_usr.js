$(function() {	
	AJAX( "verSucursales", vistaRegUsr, errorConn, usuario );
	
	$("[name=co_rol]").bind('change', function() {
		var rol = $(this).find(':selected').attr('value');
		if( rol == 1 || rol == 2 ){
			$('[name=co_org]' ).closest( '.ui-select' ).addClass( 'ui-disabled' );
		}else{
			$('[name=co_org]' ).closest( '.ui-select' ).removeClass( 'ui-disabled' );
		}
	})

})	

function vistaRegUsr( datos ) {
	if( datos.filas > 0 ){
		var a 		= datos.datos,
			html 	= "";
		$.each( a , function( i ) {
			html += "<option value="+a[i]['co_sucursal']+">"+a[i]['tx_sucursal']+"</option>";
		});
		$('[name=co_org]').append(html);
	}
}

function registroUsr() {
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
			data["co_org"] = $('[name=co_org] option:selected').attr('value');
			data["co_creado_por"] = usuario.co_usuario;
			AJAX( "registrarUsuario", rspBase, errorConn, data );
		}
	}	
}

function resetRegistroUsr() {
	$("[name]").each(function() {
		$(this).val("");
	})
}