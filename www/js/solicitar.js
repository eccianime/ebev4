function SolicitarServ() {

	var datos = {};
	var vacios = 0;

	$.each( $("body [name]"), function( i, v ) {
		var n = $(this).attr("name");
		if( $(this).val() == ""  ){
			vacios++;
		}else{
			datos[n] = $(this).val();
		}
	});

	if( vacios > 0 ){
		abrirModal( 1, "Disculpe, no puede dejar campos vacíos." );
	}else{
		var url = "?accion=solicitarserv";
		CORS( url, "rspBase", errorConn, datos );
	}
}