$("[name=tx_nombre]").val( usuario.tx_nombre );
$("[name=tx_nick]").val( usuario.tx_nick );
$("[name=co_usuario]").val( usuario.co_usuario );

function actulizarPass() {
	var pass = {
		tx_pass_nueva: $("[name=tx_pass_nueva]").val(),
		tx_pass_nueva_2: $("[name=tx_pass_nueva_2]").val()
	}

	if( pass.tx_pass_nueva == "" || pass.tx_pass_nueva_2 == "" ){
		abrirModal( 1, "Disculpe, no puede dejar campos vacíos." );
	}else if( pass.tx_pass_nueva != pass.tx_pass_nueva_2 ){
		abrirModal( 1, "Disculpe, las contraseñas no coinciden." );
	}else{
		//CORS( "?accion=cambiarPass", "cambiarPass", errorLogin, pass.tx_pass_nueva );
	}
}