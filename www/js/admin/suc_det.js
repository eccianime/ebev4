$(function() {
	AJAX( "verSucursalDetalle", verSucursalDetalleRSP, errorConn, sucursal );
})

function verSucursalDetalleRSP( xhr ) {
	$("[data-nombre-sucursal]").html(xhr.datos["tx_sucursal"]);
	
	$.each( xhr.datos, function( i ) {
		$("[name="+i+"]").val( xhr.datos[i] );
	} )
}	
