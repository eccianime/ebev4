$(function() {
	AJAX( "verEmpresaSola", llenarEmpresaSola, errorConn, usuario );
	obtenerUbicacion( ".caja", ".ui-page-active [name=nu_lat_lng]" );
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
			co_empresa: 		$("[data-co_empresa]").val(),
		}

		AJAX( "registroSucursal", function( rsp ) {
			if( rsp.success == true ){
				abrirModal(2, rsp.msg, 1);	
			}else{
				abrirModal(1, rsp.msg);	
			}
			quitarCargando();
		}, errorConn, datos );
	}
}