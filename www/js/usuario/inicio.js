var sexo = usuario.co_sexo == 2 ? "a, " : "o, ";
$("[data-nick-perfil]").html(sexo+usuario.tx_nombre);

function llenarEmpresaSucursal( datos ) {
	var obj 		= datos.datos[0],
		empresa 	= obj['tx_empresa'],
		sucursal 	= obj['tx_sucursal'],
		co_sucursal = obj['co_sucursal'];

	$("[data-empresa]").html( empresa );
	$("[data-sucursal]").html( sucursal );
	$("[data-co_sucursal]").val( co_sucursal );
}