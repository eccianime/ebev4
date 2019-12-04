function editarSucursal() {
	var datos = {
		co_sucursal: $("[name=co_sucursal]").val(),
		tx_sucursal: $("[name=tx_sucursal]").val(),
		tx_tlf_suc: $("[name=tx_tlf_suc]").val(),
		nu_lat_lng: $("[name=nu_lat_lng]").val(),
		tx_direccion_suc: $("[name=tx_direccion_suc]").val(),
	}

	AJAX( "editarSucursal", rspBase, errorConn, datos );
}