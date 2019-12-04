var sucursal;

AJAX( "verEmpresaSola", llenarEmpresaSola, errorConn, usuario );
AJAX( "verSucursales", vistaAdmPto, errorConn, usuario );

function vistaAdmPto( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<li><a class='ui-btn lista-centrado' href=#>\
			<span class='negrita' style='white-space:normal'><br>\
				NO EXISTEN SUCURSALES ASOCIADAS AL USUARIO, "+usuario.tx_nick.toUpperCase()+". PÓNGASE EN CONTACTO CON UN SUPER-USUARIO PARA SU RESPECTIVA ASIGNACIÓN.<br>\
				<br></span>\
			</a></li>\
		";
		$(".ui-page-active .sucursales").append(html);		
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
						<span class='negrita'>"+a[i]['tx_sucursal']+"</span>\
						<span onclick='borrarSucursal("+a[i]['co_sucursal']+")' class='fa fa-trash icono-accion color-rojo'></span>\
						<span onclick='editarSucursal("+a[i]['co_sucursal']+")' class='fa fa-pencil icono-accion color-naranja'></span>\
						<span onclick='verSucursal("+a[i]['co_sucursal']+")' class='fa fa-eye icono-accion color-verde'></span>\
					</a></li>\
					";
		});
		$(".sucursales").append(html);
	}
}

function verSucursal( id ) {
	sucursal = { co_sucursal: id };
	$.mobile.changePage( "suc_det.html" );
}

function editarSucursal( id ) {
	sucursal = { co_sucursal: id };	
	$.mobile.changePage( "suc_edt.html" );
}

function borrarSucursal( id ) {
	sucursal = { co_sucursal: id };
}