var sexo = usuario.co_sexo == 2 ? "a, " : "o, ";
$("[data-nick-perfil]").html(sexo+usuario.tx_nombre);

function llenarEmpresaSola( datos ) {
	var obj 		= datos.datos[0],
		empresa 	= obj['tx_empresa'],
		sucursal 	= obj['tx_sucursal'],
		co_empresa 	= obj['co_empresa'],
		co_sucursal = obj['co_sucursal'];

	$("[data-co_empresa]").val( co_empresa );
	$("[data-empresa]").html( empresa );
	$("[data-sucursal]").html( sucursal );
	$("[data-co_sucursal]").val( co_sucursal );
}