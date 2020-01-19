var sexo = usuario.co_sexo == 2 ? "a, " : "o, ";
$(function() {
	$("[data-nick-perfil]").html(sexo+usuario.tx_nombre);
})