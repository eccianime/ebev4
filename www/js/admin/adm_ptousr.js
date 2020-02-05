var sucursales_ptos;
var usuarios_ptos;

$(function() {	
	AJAX( "verSucursales", selectAdmPto, errorConn, usuario );
	AJAX( "verUsuariosLibres", selectAdmUsr, errorConn );

	$('[name=select_sucursal]').change( function() {
		var v = $("[name=select_sucursal] option:selected").attr('value');
		if( v == "" ){
			$("[name=co_sucursal]").val( "" );
			$("[name=tx_sucursal]").val( "" );
			$("[name=tx_direccion_suc]").val( "" );
		}else{
			$("[name=co_sucursal]").val( sucursales_ptos[v]['co_sucursal'] );
			$("[name=tx_sucursal]").val( sucursales_ptos[v]['tx_sucursal'] );
			$("[name=tx_direccion_suc]").val( sucursales_ptos[v]['tx_direccion_suc'] );
		}
	})

	$('[name=select_usuarios]').change( function() {
		var v = $("[name=select_usuarios] option:selected").attr('value');
		if( v == "" ){
			$("[name=co_usuario]").val( "" );
			$("[name=tx_nombres]").val( "" );
			$("[name=tx_apellidos]").val( "" );
		}else{
			$("[name=co_usuario]").val( usuarios_ptos[v]['co_usuario'] );
			$("[name=tx_nombres]").val( usuarios_ptos[v]['tx_nombre']+" "+usuarios_ptos[v]['tx_nombre_2'] );
			$("[name=tx_apellidos]").val( usuarios_ptos[v]['tx_apellido']+" "+usuarios_ptos[v]['tx_apellido_2'] );
		}
		
	})
})

function selectAdmPto( datos ) {
	if( datos.filas > 0 ){
		var html 	= "";
		sucursales_ptos 	= datos.datos;
		$.each( sucursales_ptos , function( i ) {
			html += "<option value="+i+">"+sucursales_ptos[i]['tx_sucursal']+"</option>"
		})
		$("[name=select_sucursal]").append( html );
	}
}

function selectAdmUsr( datos ) {
	if( datos.filas > 0 ){
		var html 		= "";
		usuarios_ptos 	= datos.datos;
		$.each( usuarios_ptos , function( i ) {
			html += "<option value="+i+">"+usuarios_ptos[i]['tx_nick'].toUpperCase()+"</option>"
		})
		$("[name=select_usuarios]").append( html );
	}
}

function linkUsuarioSucursal() {
	var datos = {
		co_usuario:  $("[name=co_usuario]").val(),
		co_sucursal: $("[name=co_sucursal]").val(),
	}

	if( datos.co_sucursal == "" || datos.co_usuario == "" ){
		abrirModal( 1, "Disculpe, alguno de los datos faltan para poder enlazar al usuario a la sucursal." );
	}else{
		AJAX( "linkUsuarioSucursal", rspBase, errorConn, datos );	
	}
}