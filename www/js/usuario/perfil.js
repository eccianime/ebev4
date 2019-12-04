$("[name=tx_nombre]").val( usuario.tx_nombre + " " + usuario.tx_apellido );
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

		var usr = {
			co_usuario: usuario.co_usuario,
			tx_pass: pass.tx_pass_nueva
		}

		AJAX( "cambiarPass", rspBase, errorConn, usr );
	}
}