$(function() {
	AJAX( "verEmpresa", verEmpresaRSP, errorConn, empresa );
})
	
function verEmpresaRSP( xhr ) {
	empresa = xhr.datos;
	$("[data-nombre-empresa]").html( xhr.datos['tx_empresa'] );	
}