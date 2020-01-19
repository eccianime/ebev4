$(function(){
	AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );
})

function buscarUsuario() {
	var u = {
		co_usuario: $("[name=tx_nick]").val(),
		tx_nick: $("[name=tx_nick]").val(),
	}

	if( u.co_usuario == "" ){
		abrirModal(1, "Primero escriba la ID o el nick del usuario.");
	}else{
		AJAX( "buscarUsuario", llenarUsuario, errorConn, u );	
	}
}

function llenarUsuario( datos ) {
	if( datos.datos.length > 0 ){
		var d = datos.datos[0];
		$("[name=co_usuario]").val( d.co_usuario );
		$("[name=tx_nombre]").val( d.tx_nombre );
		$("[name=tx_nombre_2]").val( d.tx_nombre_2 );
		$("[name=tx_apellido]").val( d.tx_apellido );
		$("[name=tx_apellido_2]").val( d.tx_apellido_2 );
		$("[name=tx_cedula]").val( d.tx_cedula );
	}else{
		abrirModal( 1, "Disculpe el usuario buscado no existe." );
	}
}

function registroAsis() {
	if( $("[name=co_usuario]").val() == ""
	 || $("[name=tx_nombre]").val() == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		var datos = {
			co_usuario: $("[name=co_usuario]").val(),
			co_sucursal: $("[data-co_sucursal]").val(),
			url_img_firma: $(".ui-page-active [name=lienzo]")[0].toDataURL(),
			co_creado_por: usuario.co_usuario,
		}

		AJAX( "registroLibroAsis", rspBase, errorConn, datos );
	}
}