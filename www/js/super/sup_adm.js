var usr = {};

$(function() {
	$('[name=select_tipo]').change( function() {
		var r = $("[name=select_tipo] option:selected").attr('value');
		verUsuariosPorRol( {"rol":r} );
	}).ready(function() {
		$('[name=select_tipo]').trigger('change');
	})
})

function verUsuariosPorRol( rol ) {
	AJAX( "verUsuariosPorRol", vistaUsuarios, errorConn, rol );
}

function vistaUsuarios( datos ) {
	if ( datos.filas == 0 ) {
		var html = "\
		<tr><td colspan=5>DE MOMENTO, NO EXISTEN REGISTROS</td></tr>\
		";
		$(".tabla-usr").empty().append(html);
	}else{
		var a 		= datos.datos,
			html 	= "";

		$.each( a , function( i ) {
			html += "<tr>\
				<td>"+a[i]['co_usuario']+"</td>\
				<td>"+a[i]['tx_nick'].toUpperCase()+"</td>\
				<td>"+a[i]['tx_nombre']+" "+a[i]['tx_apellido']+"</td>\
				<td>"+a[i]['tx_cedula']+"</td>\
				<td>\
					<span onclick=usuarioDet("+a[i]['co_usuario']+") class='fa fa-eye icono-accion-tabla color-verde'></span>\
					<span onclick=usuarioEdt("+a[i]['co_usuario']+") class='fa fa-pencil icono-accion-tabla color-naranja'></span>\
					<span onclick=usuarioDel("+a[i]['co_usuario']+") class='fa fa-trash icono-accion-tabla color-rojo'></span>\
				</td></tr>\
			";
		});
		$(".tabla-usr").empty().append(html);
	}
}

function usuarioDet( id ) {
	usr = { co_usuario: id };
	$.mobile.changePage( "../super/usr_det.html" );
}

function usuarioEdt( id ) {
	usr = { co_usuario: id };
	$.mobile.changePage( "../super/usr_edt.html" );
}

function usuarioDel( id ) {
	usr = { co_usuario: id };
}	