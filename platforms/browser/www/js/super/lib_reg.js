$(function() {
	AJAX( "verSucursalesGral", selectAdmPto, errorConn, empresa );
	$("[name=tx_empresa]").val( empresa.tx_empresa );
})

function selectAdmPto( datos ) {
	if( datos.filas > 0 ){
		var html 	= "";
		sucursales_ptos 	= datos.datos;
		$.each( sucursales_ptos , function( i ) {
			html += "<option value="+sucursales_ptos[i]['co_sucursal']+">"+sucursales_ptos[i]['tx_sucursal']+"</option>"
		})
		$("[name=select_sucursal]").append( html );
	}
}

function registrarLibro() {
	var datos = {
		co_tipo: 			$("[name=co_tipo]").val(),
		tx_nombre: 			$("[name=tx_nombre]").val(),
		co_sucursal: 		$("[name=select_sucursal] option:selected").attr('value'),
		co_creado_por: 		usuario.co_usuario,
	}

	if( datos.tx_nombre == "" || datos.co_sucursal == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );	
	}else{
		AJAX( "registrarLibro", rspBase, errorConn, datos );
	}
}