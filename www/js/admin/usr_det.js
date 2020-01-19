$(function() {
	AJAX( "usuarioDetalles", llenarUsuario, errorConn, usr );
})

function llenarUsuario( xhr ) {
	var d = xhr.datos[0];
	usr = d;

	$.each( d, function( i ) {
		$("[name="+i+"]").val( d[i] );
	} )
	$("[name=co_rol] option[value='"+d['co_rol']+"']")
		.attr("selected", true)
		.siblings().attr("selected",false)
		.closest("[name=co_rol]").selectmenu().selectmenu("refresh",true);
	
	var data = {};
	if( usuario.co_rol == 1 ){
		data = empresa;
	}else{
		data = {
			co_empresa: usuario.co_empresa
		}
	}
	AJAX( "verSucursalesGral", selectAdmPto, errorConn, data );
}

function selectAdmPto( datos ) {
	if( datos.filas > 0 ){
		var html 	= "";
		sucursales_ptos 	= datos.datos;
		$.each( sucursales_ptos , function( i ) {
			html += "<option value="+sucursales_ptos[i]['co_sucursal']+">"+sucursales_ptos[i]['tx_sucursal']+"</option>"
		})
		$("[name=co_org]")
			.append( html )
			.ready(function() {
				$("[name=co_org] option[value='"+usr['co_sucursal']+"']")
					.attr("selected", true)
					.siblings().attr("selected",false)
					.closest("[name=co_org]").selectmenu().selectmenu("refresh",true);			
		});
	}
}