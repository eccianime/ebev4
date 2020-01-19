function onBodyLoad() {
	document.addEventListener("deviceready", PGcargado, false);
	document.addEventListener("backbutton", botonAtras, false);
}

function botonAtras( e ) {
	e.preventDefault();
	if( $('.ui-page-active').attr("id") == "home" ){
		if( $( '#modalSalir-popup' ).hasClass( 'ui-popup-active' ) ){
			window.history.back();
		}else{
			abrirModalSalir();	
		}
	}
}

function SalirApp() {
	navigator.app.exitApp();	
}

function PGcargado(){

	$.mobile.defaultPageTransition = 'pop';
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = "b";
	$.mobile.pageLoadErrorMessage = "Disculpe, su solicitud no pudo ser procesada.";
	$.mobile.pageLoadErrorMessageTheme = "b";
	$.mobile.pageLoadErrorMessageTheme = "b";

	$("#modalGeneral").popup();
	$("#modalSalir").popup();

	setTimeout( function () {
		$(".splash").fadeOut();
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
const SITIO_WEB = "http://appevt.zz.com.ve/";
//const SITIO_WEB = "http://localhost/ebetracking/";

const URL_BASE = SITIO_WEB+"webservice.php?accion=";

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

function abrirModalSalir() {
	$(".ui-popup.ui-body-inherit").css({backgroundColor:"rgb(255,168,0)"});
	$(".ui-popup .ui-btn").css({backgroundColor:"rgb(255,168,0)"});
	$("#modalSalir").popup("open");
}

function mostrarCargando() {
	var loading = "<div class='splash mid-transp'></div>";
	$('[data-role=page]').append(loading);
}

function quitarCargando() {
	$(".splash").remove();
}

function AJAX( url, respuesta, error, datos ) {
	mostrarCargando();
	$.ajax({
		type: "POST",
		url: URL_BASE+url,
		success: respuesta,
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
	quitarCargando();
	abrirModal( 1, "Disculpe, hubo un error al conectar. Intente nuevamente o contacte al administrador del sistema." );
}

function obtenerUbicacion( quien_ocultar, name_campo ) {
	//$(quien_ocultar).append( "<div class=overlay><span style=padding-top:80px>Cargando Ubicación...</span></div>" );

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition( exito, error, { enableHighAccuracy: true } );	
	}else{
		console.log("NO ESTA DISPONIBLE");
	}

	function exito ( pos ) {
		$.get("https://www.mapquestapi.com/geocoding/v1/reverse?key=D55slb0Kizl6iK3HMIYHZJQwATmGPbDx&location="
			+pos.coords.latitude+","+pos.coords.longitude, function( data ) {
				var r = data.results[0].locations[0];
				$(name_campo)
					.closest(".caja")
					.find("[name=tx_direccion_suc]")
					.val( r.street + ". " + r.adminArea6 + ". " + r.adminArea5+ ". " + r.adminArea3 );
		});
		$(name_campo).val( pos.coords.latitude + "," + pos.coords.longitude );
		$(name_campo)
			.closest('.input-agrupado')
			.after( "<img class='mapa-fijo img-responsive' src=https://www.mapquestapi.com/staticmap/v5/map?key=D55slb0Kizl6iK3HMIYHZJQwATmGPbDx&center="
				+pos.coords.latitude+","+pos.coords.longitude+"&zoom=17&locations="
				+pos.coords.latitude+","+pos.coords.longitude+">" );
		//$(".overlay").remove();	
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