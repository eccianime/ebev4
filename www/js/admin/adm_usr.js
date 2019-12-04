AJAX( "verEmpresaSola", llenarEmpresaSola, errorConn, usuario );
AJAX( "verUsuarios", vistaUsuarios, errorConn, usuario );

function vistaUsuarios( datos ) {
	if ( datos.filas == 0 ) {
		var html = "\
		<tr><td colspan=5>DE MOMENTO, NO EXISTEN REGISTROS PARA ESTA EMPRESA</td></tr>\
		";
		$(".tabla-usr").append(html);
	}else{
		var a 		= datos.datos,
			html 	= "";

		$.each( a , function( i ) {
			html += "<tr>\
				<td>"+a[i]['co_usuario']+"</td>\
				<td>"+a[i]['tx_nombre']+" "+a[i]['tx_apellido']+"</td>\
				<td>"+a[i]['tx_cedula']+"</td>\
				<td>"+a[i]['tx_sucursal']+"</td>\
				<td><span class='fa fa-eye icono-accion-tabla color-verde'></span> <span class='fa fa-pencil icono-accion-tabla color-naranja'></span> <span class='fa fa-trash icono-accion-tabla color-rojo'></span></td>\
			</tr>\
			";
		});
		$(".tabla-usr").append(html);
	}
}