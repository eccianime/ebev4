function onBodyLoad() {
	document.addEventListener("deviceready", PGcargado, false);
}

function PGcargado(){

	$.mobile.defaultPageTransition = 'pop';
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = "b";
	$.mobile.pageLoadErrorMessage = "Disculpe, su solicitud no pudo ser procesada.";
	$.mobile.pageLoadErrorMessageTheme = "b";
	$.mobile.pageLoadErrorMessageTheme = "b";

	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;

	$("#modalGeneral").popup();

	setTimeout( function () {
		$(".splash").fadeOut().remove();
	}, 3000);

	setInterval( function () {
		checkConnection();

		var hg = new Date();
		var h = hg.getHours();
		var m = hg.getMinutes();
		var s = hg.getSeconds();

		$("#hora").html(h+":"+m+":"+s);

	}, 1000 );
}

var usuario = {};
//const URL_BASE = "http://appevt.zz.com.ve/webservice.php";
const URL_BASE = "http://localhost/ebetracking/webservice.php";

function abrirModal( nro, mensaje, regresar = null ) {
	var color = nro == 1 ? "rgb(213,14,33)" : ( nro == 2 ? "rgb(90,177,20)" : "rgb(255,168,0)" ) ;
	var titulo = nro == 1 ? "<i class='fa fa-times-circle'></i> Ocurrió un Error" : ( nro == 2 ? "<i class='fa fa-check-circle'></i> Éxito" : "<i class='fa fa-warning'></i> Información" );
	$(".ui-popup.ui-body-inherit").css({backgroundColor:color});
	$(".ui-popup .ui-btn").css({backgroundColor:color});

	$("#tituloModal").html(titulo);
	$("#mensajeModal").html(mensaje);

	if( regresar != null ){
		$("#botonAtrasModal").attr('data-rel',"");
		$("#botonAtrasModal").attr('onclick', 'window.history.back();window.history.back();' );
	}else{
		$("#botonAtrasModal").attr('data-rel',"back");
		$("#botonAtrasModal").attr('onclick', "" );
	}

	$("#modalGeneral").popup("open");
}

function mostrarCargando() {
	var loading = "<div class='splash mid-transp'></div>";
	$('[data-role=page]').append(loading);
}

function quitarCargando() {
	$(".splash").remove();
}

function CORS ( url, respuesta, error, datos) {
	mostrarCargando();
	$.ajax({
		type: "GET",
		url: url,
		dataType: "jsonp",
		crossDomain: true,
		jsonpCallback: respuesta,
		error: error,
		data: datos,
	}).done(function () {
		quitarCargando();
	});
}

function rspBase( datos ) {
	abrirModal( datos.nro, datos.msg, datos.reg );	
}

function errorConn() {
	$(".splash").remove();
	abrirModal( 1, "Disculpe, hubo un error al conectar. Intente nuevamente o contacte al administrador del sistema." );
}

function obtenerUbicacion( quien_ocultar, name_campo ) {
	$(quien_ocultar).append( "<div class=overlay><span style=padding-top:80px>Cargando Ubicación...</span></div>" );
	navigator.geolocation.getCurrentPosition( exito, error );

	function exito ( pos ) {
		$(name_campo).val( pos.coords.latitude + "/" + pos.coords.longitude );
		$(".overlay").remove();
	};

	function error (error) {
		var errC;
		switch(error.code.toString()){
			case "1":
				errC = "PERMISO DENEGADO";
			break;
			case "2":
				errC = "NO DISPONIBLE";
			break;
			case "3":
				errC = "TIEMPO DE RESPUESTA AGOTADO";
			break;
			default:
				errC = "ERROR DESCONOCIDO";
			break;
		}
		abrirModal( 1, errC+". Por favor, cierre la aplicación y ábrala nuevamente." );
		$(".overlay").remove();
	}
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    $("#con").html(states[networkState]);
}