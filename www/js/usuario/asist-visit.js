function resetCampos() {
	$("[name]").each(function() {
		$(this).val("");
	})
	$("label[for=url_img_firma]").html("Imagen de Firma");	
}