AJAX( "verEmpresaSucursal", llenarEmpresaSucursal, errorConn, usuario );
obtenerUbicacion( ".caja", ".ui-page-active [name=nu_lat_lng]" );

$("[type=file]").change(function() {
	var v = $(this).prop("files")[0]['name'];
	var n = $(this).attr("name");

	$("label[for="+n+"]").html(v);
	$("label[for="+n+"]").css({color:"black", wordBreak: "break-all"});
})


function registro() {
	if( $("[name=tx_descripcion]").val() == "" ||
		$("[name=tx_adjunto]").val() == "" || 
		$("[name=nu_lat_lng]").val() == "" ){
		abrirModal( 1, "Por favor, no deje campos vacíos..." );
	}else{
		mostrarCargando();

		var urlregistro = URL_BASE+"registroBitac";

		var fd = new FormData();
		var file1 = $('[name=tx_adjunto]')[0].files[0]; 
        fd.append('archivo', file1);
        fd.append('tx_descripcion', $("[name=tx_descripcion]").val());
        fd.append('nu_lat_lng', $("[name=nu_lat_lng]").val());
        fd.append('co_sucursal', $("[data-co_sucursal]").val());
        fd.append('co_usuario', usuario.co_usuario);
        fd.append('url_img_firma', $(".ui-page-active [name=lienzo]")[0].toDataURL() );

		$.ajax({
			type: 'post',
			url: urlregistro,
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			data: fd,
			complete: function ( xhr, status ) {
				var resp = $.parseJSON( xhr.responseText );
				
				quitarCargando();
				if( resp.success == true ){
					abrirModal(2, "Se realizó el registro de forma exitósa.", 1);
				}else{
					abrirModal(1, "Ocurrió un problema, informe al administrador el CODIGO ERR0001");
				}
			},
		});
	}

}


var canvas,ctx;
var mouseX,mouseY,presionado=0;
var touchX,touchY;
var lastX,lastY=-1;

function dibujar(ctx,x,y,size) {
	if (lastX==-1) {
		lastX=x;
		lastY=y;
	}

	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(lastX,lastY);
	ctx.lineTo(x,y);
	ctx.lineWidth = size;
	ctx.stroke();
	ctx.closePath();
	lastX=x;
	lastY=y;
} 

function limpiarCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function lienzoPresion() {
	presionado=1;
	dibujar(ctx,mouseX,mouseY,1);
}

function lienzoLiberaPresion() {
	presionado=0;
	lastX=-1;
	lastY=-1;
}

function lienzoMover(e) { 
	posicionRaton(e);
	if (presionado==1) {
		dibujar(ctx,mouseX,mouseY,1);
	}
}

function posicionRaton(e) {
	if (!e)
		var e = event;

	if (e.offsetX) {
		mouseX = e.offsetX;
		mouseY = e.offsetY;
	}
	else if (e.layerX) {
		mouseX = e.layerX;
		mouseY = e.layerY;
	}
 }

function tocarLienzo() {
	obtenerPosRaton();
	dibujar(ctx,touchX,touchY,12);
	event.preventDefault();
}

function dejaTocarLienzo() {
	lastX=-1;
	lastY=-1;
}

function moverToqueLienzo(e) { 
	obtenerPosRaton(e);
	dibujar(ctx,touchX,touchY,12); 
	event.preventDefault();
}

function obtenerPosRaton(e) {
	if (!e){
		var e = event;
	}

	if(e.touches) {
		touchX=touch.pageX-touch.target.offsetLeft;
		touchY=touch.pageY-touch.target.offsetTop;
	}
	
}

function init() {
	canvas = $("[name=lienzo]")[0];

	if (canvas.getContext)
		ctx = canvas.getContext('2d');

	if (ctx) {
		canvas.addEventListener('mousedown', lienzoPresion, false);
		canvas.addEventListener('mousemove', lienzoMover, false);
		window.addEventListener('mouseup', lienzoLiberaPresion, false);

		canvas.addEventListener('touchstart', tocarLienzo, false);
		canvas.addEventListener('touchend', dejaTocarLienzo, false);
		canvas.addEventListener('touchmove', moverToqueLienzo, false);
	}
}
init();