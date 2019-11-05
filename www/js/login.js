$("#boton-login").click( function() {
	var usr = {
		tx_email: $("[name=tx_email]").val(),
		tx_pass: $("[name=tx_pass]").val()
	}

	if( usr.tx_email == "" || usr.tx_pass == "" ){
		abrirModal( 1, "Disculpe, no puede dejar campos vacíos." );
	}else{
		var url = "?accion=entrar";
		CORS( URL_BASE+url, "entrar", errorConn, usr );
	}
})

function entrar( datos ) {

	if( datos.success == true ){
		usuario = datos.datos[0];
		switch(usuario.co_rol){
			case "1": 	$.mobile.changePage("super/inicio.html");	break;
			case "2": 	$.mobile.changePage("admin/inicio.html");	break;
			case "3": 	$.mobile.changePage("usuario/inicio.html");	break;
		}
	}else{
		abrirModal( 1, "Disculpe, las credenciales utilizadas son incorrectas o el usuario no existe." )
	}	
}