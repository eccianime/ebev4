var envio = {};

$(function() {
	$("[name=desde]").change(function() {
		if( $(this).val() != "" ){
			$("[name=co_libro_bit]").val("");
			triggerBusqueda();	
		}
	})

	$("[name=hasta]").change(function() {
		if( $(this).val() != "" ){
			$("[name=co_libro_bit]").val("");
			triggerBusqueda();	
		}
	})

	$("[name=tx_palabra_clave]").change(function() {
		if( $(this).val() != "" ){
			$("[name=co_libro_bit]").val("");
			triggerBusqueda();	
		}
	}).keyup(function() {
		$(this).trigger('change');
	})

	$("[name=co_libro_bit]").change(function() {
		if( $(this).val() != "" ){
			$("[name=desde]").val("");
			$("[name=hasta]").val("");
			$("[name=tx_palabra_clave]").val("");
			triggerBusqueda();
		}
	}).keyup(function() {
		$(this).trigger('change');
	})

	$("[imprimir]").click( function() {
		var str = "?reporte="+JSON.stringify(envio);
		window.open( SITIO_WEB+"Reportes/reporteBitacora.php"+str, "_system" );
	})
})

function triggerBusqueda() {
	var datos = {
		desde: $("[name=desde]").val(),
		hasta: $("[name=hasta]").val(),
		tx_palabra_clave: $("[name=tx_palabra_clave]").val(),
		co_libro_bit: $("[name=co_libro_bit]").val(),
		co_libro: libroBit.co_libro,
		tx_libro: libroBit.tx_nombre,
	};
	envio = datos;
	AJAX( "buscaBitacora", buscaBitacoraRSP, errorConn, datos );
}

function buscaBitacoraRSP( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<li><a class='ui-btn lista-centrado' href=#>\
			<span class='negrita'><br>\
				DE MOMENTO, NO EXISTEN REGISTROS PARA ESTA BÚSQUEDA<br>\
				<br></span>\
			</a></li>\
		";
		$(".bitacora").html("").append(html);
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
			<li><a class='ui-btn lista-justificado' href='#'>\
				<span class='negrita'>FECHA: "+d+"/"+m+"/"+y+" <br>\
				NOVEDAD: "+a[i]['co_libro_bit']+"<br>\
				HORA: "+h+":"+mi+"<br><br></span>\
				<span class=lista-desc>"+a[i]['tx_descripcion']+"\
			</a></li>\
			";
		});
		$(".bitacora").html("").append(html);
	}
}