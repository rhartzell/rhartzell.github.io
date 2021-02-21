window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame 	||
	window.webkitRequestAnimationFrame 		||
	window.mozRequestAnimationFrame    		||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();

var canvas 	  = document.getElementById('canvas'),
	ctx       = canvas.getContext('2d'),
	ww        = window.innerWidth/4,
	wh        = window.innerHeight/4,
	size 	  = 50,
	height    = wh*(size/75),
	x         = ww/4,
	y         = (wh-height)/2-(height/7),
	triangles = 2
	colors    = [],
	colorD 	  = [60, 20, 80],
	start     = true,
	speed     = 40,
	g         = [x, y+(height*2/3)],
	invert	  = -1,
	border 	  = "#ffffff",
	mask 	  = false,
	radius    = 5,
	angle     = 0;

canvas.width  = ww;
canvas.height = wh;
ctx.lineWidth   = 1;

//Set the shading colors
function setColor(){
	for (var i=0;i<=triangles;i++){
		colors[i] = "rgba("+(colorD[0]+(i*(triangles/6)))+","+(colorD[1]+(i*(triangles/6)))+","+(colorD[2]+(i*(triangles/6)))+",1)";
	}
}
setColor();

var j = 0, k = 0;
var startTime = undefined;
function draw(time){

  if (time === undefined)
    time = Date.now();
  if (startTime === undefined)
    startTime = time;
 
  dt = ((time - startTime)/100 % 500);

  if(x > 0.75*ww){
		x = ww/4;
		ctx.clearRect(0,0,ww,wh);
		ctx.save();
	}

	y += 10*Math.sin(x/10);
	ctx.beginPath();
	var radius = 1 + 20 * Math.abs(Math.cos(angle));
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
		
	ctx.fillStyle = "#006699";
	ctx.fill();

	angle += Math.PI / 64;


	x++;
}


(function animloop(){
  requestAnimFrame(animloop);
  if(start)draw();
})();


document.getElementById("pause").addEventListener("click", function(){
	start = !start;
	if(start)document.getElementById("pause").innerHTML = "Pause";
	else document.getElementById("pause").innerHTML = "Play";
});
