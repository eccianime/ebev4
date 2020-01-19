function registroEmpresa() {
	var datos = {
		tx_empresa: $("[name=tx_empresa]").val(),
		tx_siglas: $("[name=tx_siglas]").val(),
		tx_tlf_emp: $("[name=tx_tlf_emp]").val(),
		tx_direccion_emp: $("[name=tx_direccion_emp]").val(),
		co_creado_por: usuario.co_usuario,
	}

	AJAX( "registroEmpresa", rspBase, errorConn, datos );
}
