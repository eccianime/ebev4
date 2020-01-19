$(function() {
	obtenerUbicacion( ".caja", "[name=nu_lat_lng]" );
})
function registroSucursal() {

	if( $("[name=tx_sucursal]").val() == "" ||
		$("[name=tx_tlf_suc]").val() == "" ||
		$("[name=tx_direccion_suc]").val() == ""  ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		mostrarCargando();

		var datos = {
			tx_sucursal: 		$("[name=tx_sucursal]").val(),
			tx_tlf_suc: 		$("[name=tx_tlf_suc]").val(),
			tx_direccion_suc: 	$("[name=tx_direccion_suc]").val(),
			nu_lat_lng: 		$("[name=nu_lat_lng]").val(),
			co_creado_por: 		usuario.co_usuario,
			co_empresa: 		empresa.co_empresa,
		}

		AJAX( "registroSucursal", rspBase, errorConn, datos );
	}
}