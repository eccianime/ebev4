function entrar( datos ) {

	if( datos.success == true ){
		usuario = datos.datos[0];
		switch(usuario.co_rol){
			case "1": 	$.mobile.changePage("super/perfil.html");	break;
			case "2": 	$.mobile.changePage("admin/perfil.html");	break;
			case "3": 	$.mobile.changePage("usuario/perfil.html");	break;
		}
	}else{
		$.mobile.changePage("mensajes/usuarioError.html");
	}	
}

function errorLogin() {
	$.mobile.changePage("mensajes/connectError.html");
}

$("#boton-login").on("click", function(e) {
	var usr = {
		nick: $("[name=tx_email]").val(),
		pass: $("[name=tx_pass]").val()
	}

	if( usr.nick == "" || usr.pass == "" ){
		$.mobile.changePage("mensajes/vaciosError.html");
	}else{
		var url = "?accion=entrar&tx_email="+usr.nick+"&tx_pass="+usr.pass;
		CORS( url, "entrar", errorLogin );
	}
})
