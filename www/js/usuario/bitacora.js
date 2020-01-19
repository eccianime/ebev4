var libro = {};

$(function() {
	AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );
	AJAX( "verBitacora", vistaBitacora, errorConn, usuario );

	$("[data-nombre-libro]").html( libroBit.tx_nombre );
})

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
		var altos = {
			a: parseInt( $(".ui-page-active").css('height') ),
			b: parseInt( $(".ui-page-active .caja-cabecera").css('height') ),
			c: parseInt( $(".ui-page-active .ui-footer").css('height') ),
			d: parseInt( $(".ui-page-active").css('min-height') ),
		};
		var a = datos.datos;
		var html = "";

		$(".caja-lista").css({maxHeight:( (altos.a)-(altos.b)-(altos.c)+32 )});
		
		$.each( a , function( i ) {
			var fecha 	= new Date(a[i]['fe_creado']),
				d 		= fecha.getDate() < 10 ? "0"+fecha.getDate() : fecha.getDate(),
				m 		= 1+fecha.getMonth() < 10 ? "0"+(1+fecha.getMonth()) : 1+fecha.getMonth(),
				y 		= fecha.getFullYear(),
				h 		= fecha.getHours() < 10 ? "0"+fecha.getHours() : fecha.getHours(),
				mi 		= fecha.getMinutes() < 10 ? "0"+fecha.getMinutes() : fecha.getMinutes();

			html += "\
			<li data-icon=plus data-libro="+a[i]['co_libro_bit']+"><a class='ui-btn ui-btn-icon-right ui-icon-plus lista-justificado' href='#'>\
				<span class='negrita'>FECHA: "+d+"/"+m+"/"+y+" <br>\
				NOVEDAD: "+a[i]['co_libro_bit']+"<br>\
				HORA: "+h+":"+mi+"<br><br></span>\
				<span class=lista-desc>"+a[i]['tx_descripcion']+"\
			</a></li>\
			";
		});
		$(".bitacora").append(html).ready(function() {
			$("[data-libro]").click( function() {
				libro.co_libro_bit = $(this).attr("data-libro");
				$.mobile.changePage( 'notas.html' );
			})
		});
	}
}