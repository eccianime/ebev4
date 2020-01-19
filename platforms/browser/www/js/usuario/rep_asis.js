$(function() {
	AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );
	AJAX( "verLibroAsis", vistaAsis, errorConn, usuario );
	
	$("[name=desde]").change(function() {
		
	})

	$("[name=hasta]").change(function() {
		
	})

	$("[name=tx_palabra_clave]").change(function() {
		
	})

	$("[data-imprimir]").click(function() {
		window.open( SITIO_WEB+"Examples/01simple-download-xls.php", "_system" );
	})

})