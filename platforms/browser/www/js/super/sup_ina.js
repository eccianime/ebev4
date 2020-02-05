var empresa = {};

$(function() {
	AJAX( "verEmpresasInac", vistaEmpresas, errorConn );
})

function vistaEmpresas( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<li><a class='ui-btn lista-centrado' href=#>\
			<span class='negrita' style='white-space:normal'><br>\
				NO EXISTEN EMPRESAS INACTIVAS<br>\
				<br></span>\
			</a></li>\
		";
		$(".ui-page-active .empresas").append(html);		
	}else{	
		var altos = {
			a: parseInt( $(".ui-page-active").css('height') ),
			b: parseInt( $(".ui-page-active .caja-cabecera").css('height') ),
			c: parseInt( $(".ui-page-active .ui-footer").css('height') ),
		};
		var a = datos.datos;
		var html = "";

		$(".caja-lista").css({maxHeight:( (altos.a)-(altos.b)-(altos.c)+32 )});
		$.each( a , function( i ) {
			html += "<li><a class='ui-btn' href='#'>\
						<span class='negrita notepases'>"+a[i]['tx_empresa']+"</span>\
						<span onclick='borrarEmpresa("+a[i]['co_empresa']+")' class='fa fa-trash icono-accion color-rojo'></span>\
						<span onclick='editarEmpresa("+a[i]['co_empresa']+")' class='fa fa-pencil icono-accion color-naranja'></span>\
						<span onclick='editarEmpresa("+a[i]['co_empresa']+")' class='fa fa-eye icono-accion color-verde'></span>\
						<span onclick='activarEmpresa("+a[i]['co_empresa']+")' class='fa fa-check icono-accion color-azul'></span>\
					</a></li>\
					";
		});
		$(".empresas").append(html);
	}
}

function editarEmpresa( id ) {
	empresa = { co_empresa: id };
	$.mobile.changePage( "sup_adm_emp.html" );
}

function borrarEmpresa( id ) {
	empresa = { co_empresa: id };
}

function activarEmpresa( id ) {
	empresa = { co_empresa: id };
	AJAX( "activarEmpresa", rspBase, errorConn, empresa );
}