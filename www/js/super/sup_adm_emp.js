$(function() {
	AJAX( "verEmpresa", verEmpresaRSP, errorConn, empresa );
})

function verEmpresaRSP( xhr ) {
	$.each( xhr.datos, function( i ) {
		$("[name="+i+"]").val( xhr.datos[i] );
	} )
}

function editarEmpresa() {
	var datos = {
		co_empresa: $("[name=co_empresa]").val(),
		tx_empresa: $("[name=tx_empresa]").val(),
		tx_siglas: $("[name=tx_siglas]").val(),
		tx_tlf_emp: $("[name=tx_tlf_emp]").val(),
		tx_direccion_emp: $("[name=tx_direccion_emp]").val(),
	}

	AJAX( "editarEmpresa", rspBase, errorConn, datos );
}