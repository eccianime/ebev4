CORS( URL_BASE+"?accion=verEmpresaSucursal", "llenarEmpresaSucursal", errorConn, usuario );
CORS( URL_BASE+"?accion=verBitacora", "vistaBitacora", errorConn, usuario );

function llenarEmpresaSucursal( datos ) {
	var obj 		= datos.datos[0],
		empresa 	= obj['tx_empresa'],
		sucursal 	= obj['tx_sucursal'],
		co_sucursal = obj['co_sucursal'];

	$("[data-empresa]").html( empresa );
	$("[data-sucursal]").html( sucursal );
	$("[data-co_sucursal]").val( co_sucursal );
}

function vistaBitacora( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<li><a class='ui-btn lista-centrado' href=#>\
			<span class='negrita'><br>\
				DE MOMENTO, NO EXISTEN REGISTROS PARA ESTE DÍA<br>\
				<br></span>\
			</a></li>\
		";
		$(".bitacora").append(html);
	}else{

		var altos = {};
		var a = datos.datos;
		var html = "";
		setTimeout( function () {
			altos = {
				a: parseInt( $(".ui-page-active").css('height') ),
				b: parseInt( $(".ui-page-active .caja-cabecera").css('height') ),
				c: parseInt( $(".ui-page-active .ui-footer").css('height') ),
			}

			$(".caja-lista").css({maxHeight:( (altos.a)-(altos.b)-(altos.c)+32 )});
		}, 2000 )
		$.each( a , function( i ) {
			var fecha 	= new Date(a[i]['fe_creado']),
				d 		= fecha.getDate(),
				m 		= fecha.getMonth(),
				y 		= fecha.getFullYear(),
				h 		= fecha.getHours(),
				mi 		= fecha.getMinutes();

			html += "\
			<li data-icon=plus><a class='ui-btn ui-btn-icon-right ui-icon-plus lista-justificado' href='notas.html'>\
				<span class='negrita'>FECHA: "+d+"/"+m+"/"+y+" <br>\
				NOVEDAD: "+a[i]['co_libro']+"<br>\
				HORA: "+h+":"+mi+"<br><br></span>\
				<span class=lista-desc>"+a[i]['tx_descripcion']+"\
			</a></li>\
			";
		});
		$(".bitacora").append(html);
	}
}

