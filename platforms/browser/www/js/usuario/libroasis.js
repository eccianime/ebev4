CORS( URL_BASE+"?accion=verEmpresaSucursal", "llenarEmpresaSucursal", errorConn, usuario );
CORS( URL_BASE+"?accion=verLibroAsis", "vistaAsis", errorConn, usuario );

function vistaAsis( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<tr><td colspan=4>DE MOMENTO, NO EXISTEN REGISTROS PARA ESTE DÍA</td></tr>\
		";
		$(".tabla-asis").append(html);
	}else{
		var a = datos.datos;
		var html = "";

		$.each( a , function( i ) {
			var fecha 	= new Date(a[i]['fe_creado']),
				d 		= fecha.getDate(),
				m 		= 1+fecha.getMonth(),
				y 		= fecha.getFullYear(),
				h 		= fecha.getHours(),
				mi 		= fecha.getMinutes();


			html += "<tr>\
			<td>"+d+"/"+m+"/"+y+"</td>\
			<td>"+h+":"+mi+"</td>\
			<td>"+a[i]['tx_nombre']+" "+a[i]['tx_apellido']+"</td>\
			<td>"+a[i]['co_usuario']+" - "+a[i]['tx_nick']+"</td>\
			</tr>\
			";
		});
		$(".tabla-asis").append(html);
		var ap = parseInt( $('.ui-page-active').css('min-height'));
	}
}