$(function(){
	AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );
	AJAX( "verLibroVis", vistaVis, errorConn, usuario );
	
	$("[data-nombre-libro]").html( libroVis.tx_nombre );

})

function vistaVis( datos ) {
	if( datos.filas == 0 ){
		var html = "\
		<tr><td colspan=6>DE MOMENTO, NO EXISTEN REGISTROS PARA ESTE DÍA</td></tr>\
		";
		$(".tabla-vis").append(html);
	}else{
		var a = datos.datos;
		var html = "";

		$.each( a , function( i ) {
			var fecha 	= new Date(a[i]['fe_creado']),
				d 		= fecha.getDate() < 10 ? "0"+fecha.getDate() : fecha.getDate(),
				m 		= 1+fecha.getMonth() < 10 ? "0"+(1+fecha.getMonth()) : 1+fecha.getMonth(),
				y 		= fecha.getFullYear(),
				h 		= fecha.getHours() < 10 ? "0"+fecha.getHours() : fecha.getHours(),
				mi 		= fecha.getMinutes() < 10 ? "0"+fecha.getMinutes() : fecha.getMinutes();

			html += "<tr>\
			<td>"+d+"/"+m+"/"+y+"</td>\
			<td>"+h+":"+mi+"</td>\
			<td>"+a[i]['tx_nombre']+" "+a[i]['tx_apellido']+"</td>\
			<td>"+a[i]['tx_cedula']+"</td>\
			<td>"+a[i]['tx_empresa']+"</td>\
			<td>"+a[i]['tx_destino']+"</td>\
			</tr>\
			";
		});
		$(".tabla-vis").append(html);
		var ap = parseInt( $('.ui-page-active').css('min-height'));
	}
}