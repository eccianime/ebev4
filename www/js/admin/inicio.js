var sexo = usuario.co_sexo == 2 ? "a, " : "o, ";
$(function() {
	$("[data-nick-perfil]").html(sexo+usuario.tx_nombre);
})

function llenarEmpresaSola( datos ) {
	var obj 		= datos.datos[0],
		co_empresa 	= obj['co_empresa'],
		empresa 	= obj['tx_empresa'],
		co_sucursal = obj['co_sucursal'],
		sucursal 	= obj['tx_sucursal'];

	$("[data-co_empresa]").val( co_empresa );
	$("[data-empresa]").html( empresa );
	$("[data-sucursal]").html( sucursal );
	$("[data-co_sucursal]").val( co_sucursal );
}