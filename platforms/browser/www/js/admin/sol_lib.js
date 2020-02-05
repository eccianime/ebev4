$(function() {
	AJAX( "verSucursalesGral", selectAdmPto, errorConn, usuario );
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