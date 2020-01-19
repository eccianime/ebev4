var libroAsis = {};
var libroVis = {};

$(function() {
	AJAX( "ultimosLibrosAsisVis", ultimosLibrosAsisVisRSP, errorConn, usuario );	
})

function ultimosLibrosAsisVisRSP( xhr ) {
	var asis = xhr.asis;
	var vis = xhr.vis;

	if( asis.cant > 0 ){
		libroAsis = asis.libroAsis;
		$(" .libroasist a ").attr("href", "libroasis.html");
	}else{
		$(" .libroasist a ").attr("onclick", 'abrirModal( 1, "No hay libros de asistencias registrados para esta sucursal. Póngase en contacto con un Administrador" );');
	}

	if( vis.cant > 0 ){
		libroVis = vis.libroVis;
		$(" .librovis a ").attr("href", "librovis.html");
	}else{
		$(" .librovis a ").attr("onclick", 'abrirModal( 1, "No hay libros de visitas registrados para esta sucursal. Póngase en contacto con un Administrador" );');
	}
}

function resetCampos() {
	$("[name]").each(function() {
		$(this).val("");
	})	
}