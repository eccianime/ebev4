function onBodyLoad() {
	document.addEventListener("deviceready", PGcargado, false);
}

var usuario = {};

function PGcargado(){

	$.mobile.defaultPageTransition = 'flip';
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = "b";
	$.mobile.pageLoadErrorMessage = "Disculpe, su solicitud no pudo ser procesada.";
	$.mobile.pageLoadErrorMessageTheme = "b";
	$.mobile.pageLoadErrorMessageTheme = "b";

	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;

	$("#pruebacors").on("click", function() {
		CORS( "", "respuestaJSONP" );
	})

	/*setTimeout( function () {
		$(".splash").fadeOut(3000);
	}, 3000);*/

	setInterval( function () {
		checkConnection();

		var hg = new Date();
		var h = hg.getHours();
		var m = hg.getMinutes();
		var s = hg.getSeconds();

		$("#hora").html(h+":"+m+":"+s);

	}, 1000 );

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


function CORS ( url, respuesta ) {
	/*var loading = "<div class='splash'></div>";*/
	/*$('[data-role=page]').append(loading);*/
	$.ajax({
		type: "GET",
		//url: "http://localhost/ebetracking/php/webservice.php"+url,
		url: "http://appevt.zz.com.ve/webservice.php"+url,
		dataType: "jsonp",
		crossDomain: true,
		jsonpCallback: respuesta,
	})/*.done(function() {
		$(".splash").remove();
	})*/;
}

function respuestaJSONP (datos) {
	$.each(datos,function (i, v) {
		$("#empieza").append("<br/><span>Índice: "+i+" - Valor: "+v+"</span>");
	});
}
function obtenerUbicacion () {
	navigator.geolocation.getCurrentPosition( bien, mal );

	function bien (posi) {
		$("#lati").html(posi.coords.latitude);
		$("#longi").html(posi.coords.longitude);
		$("#alti").html(posi.coords.altitude);
	};

	function mal (error) {
		switch(error.code.toString()){
			case "1":
				$("#lati").html("PERMISO DENEGADO");
				$("#longi").html("PERMISO DENEGADO");
				$("#alti").html("PERMISO DENEGADO");
			break;
			case "2":
				$("#lati").html("NO DISPONIBLE");
				$("#longi").html("NO DISPONIBLE");
				$("#alti").html("NO DISPONIBLE");
			break;
			case "3":
				$("#lati").html("TIEMPO DE RESPUESTA AGOTADO");
				$("#longi").html("TIEMPO DE RESPUESTA AGOTADO");
				$("#alti").html("TIEMPO DE RESPUESTA AGOTADO");
			break;
			default:
				$("#lati").html("ERROR DESCONOCIDO");
				$("#longi").html("ERROR DESCONOCIDO");
				$("#alti").html("ERROR DESCONOCIDO");
			break;
		}
	}
}