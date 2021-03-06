var empresa = {};

$(function() {
	AJAX( "verEmpresas", vistaEmpresas, errorConn );
})

function vistaEmpresas( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<li><a class='ui-btn lista-centrado' href=#>\
			<span class='negrita' style='white-space:normal'><br>\
				NO EXISTEN EMPRESAS EN LA APLICACIÓN<br>\
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
						<span onclick='desactivarEmpresa("+a[i]['co_empresa']+")' class='fa fa-trash icono-accion color-rojo'></span>\
						<span onclick='editarEmpresa("+a[i]['co_empresa']+")' class='fa fa-pencil icono-accion color-naranja'></span>\
						<span onclick='verEmpresa("+a[i]['co_empresa']+")' class='fa fa-eye icono-accion color-verde'></span>\
					</a></li>\
					";
		});
		$(".empresas").append(html);
	}
}

function verEmpresa( id ) {
	empresa = { co_empresa: id };
	$.mobile.changePage( "emp_inicio.html" );
}

function editarEmpresa( id ) {
	empresa = { co_empresa: id };
	$.mobile.changePage( "sup_adm_emp.html" );
}

function desactivarEmpresa( id ) {
	empresa = { co_empresa: id };
	AJAX( "desactivarEmpresa", rspBase, errorConn, empresa );
}