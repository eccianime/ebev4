var lib_vis = {};

$(function() {
	AJAX( "verListaLibrosVis", verListaLibrosVisRSP, errorConn, empresa );
})

function verListaLibrosVisRSP( datos ) {
	if ( datos.filas == 0 ) {
		var html = "\
		<tr><td colspan=5>DE MOMENTO, NO EXISTEN REGISTROS</td></tr>\
		";
		$(".tabla-lib-vis").append(html);
	}else{
		var a 		= datos.datos,
			html 	= "";

		$.each( a , function( i ) {
			html += "<tr>\
				<td>"+a[i]['co_libro']+"</td>\
				<td>"+a[i]['tx_nombre']+"</td>\
				<td>"+a[i]['tx_sucursal']+"</td>\
				<td>"+a[i]['tx_empresa']+"</td>\
				<td>\
					<span class='fa fa-eye icono-accion-tabla color-verde'></span>\
					<span class='fa fa-pencil icono-accion-tabla color-naranja'></span>\
					<span class='fa fa-trash icono-accion-tabla color-rojo'></span>\
				</td></tr>\
			";
		});
		$(".tabla-lib-vis").append(html);
	}
}