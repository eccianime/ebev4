var libroBit = {};
var sexo = usuario.co_sexo == 2 ? "a, " : "o, ";

$(function() {
	$("[data-nick-perfil]").html(sexo+usuario.tx_nombre);

	AJAX( "ultimoLibroBit", ultimoLibroBitRSP, errorConn, usuario );
})

function ultimoLibroBitRSP( xhr ) {
	if( xhr.cant > 0 ){
		libroBit = xhr.libroBit;
		$(" .librobit a ").attr("href", "bitacora.html");
	}else{
		$(" .librobit a ").attr("onclick", 'abrirModal( 1, "No hay libros de eventos registrados para esta sucursal. Póngase en contacto con un Administrador" );');		
	}
}

function llenarEmpresaSucursal( datos ) {
	var obj 		= datos.datos[0],
		empresa 	= obj['tx_empresa'],
		sucursal 	= obj['tx_sucursal'],
		co_sucursal = obj['co_sucursal'];

	$("[data-empresa]").html( empresa );
	$("[data-sucursal]").html( sucursal );
	$("[data-co_sucursal]").val( co_sucursal );
}

