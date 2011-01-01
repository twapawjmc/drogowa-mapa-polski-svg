var _svg = document.documentElement;
var mapa = {};
var pP; //mijesce poprzedniego darzenia
var p;
var zoom = 1;
var scale = 1;
var w = window.innerWidth;
var h = window.innerHeight;
var dx = 0;
var dy = 0;


ustawZdarzenia(_svg);

//ustawiamy obsługę zdarzeń
function ustawZdarzenia(_svg)
	{
	
	_svg.onmousedown = mouseDown;
	_svg.onmousemove = mouseMove;
	_svg.onmouseup = mouseUp;
	_svg.onmousewheel = mouseWheel;

	if(window.addEventListener)
		_svg.addEventListener('DOMMouseScroll', mouseWheel, false);
	
	document.addEventListener('DOMContentLoaded', function(e){
	
		mapa.element = document.getElementById("mapa");
		mapa.woj = document.getElementById("wojewodztwa_polski");
		mapa.wojsz = Number(mapa.woj.getAttribute('stroke-width'));
		mapa.pol = document.getElementById("pol");
		mapa.polsz = Number(mapa.pol.getAttribute('stroke-width'));
		mapa.przenos = false;
		mapa.tA = mapa.element.transform.animVal;
		mapa.tB = mapa.element.transform.baseVal;
		
		var t = mapa.m =  mapa.tB.createSVGTransformFromMatrix(mapa.element.getCTM());
		if(mapa.tB.numberOfItems == 0) mapa.tB.clear();
		mapa.tB.appendItem(t);
		
		}, false);
	}
	
function mouseDown(e)
	{
	e = e || window.event;
	punktZdarzenia(e);
	mapa.przenos = true;
	}

function mouseUp(e)
	{
	mapa.przenos = false;
	}
	
function mouseMove(e)
	{
	e = e || window.event;
	punktZdarzenia(e);
	if(!mapa.przenos) return;
	
	var matrix = mapa.element.getCTM()
	matrix.e += (p.x - pP.x);
	matrix.f += (p.y - pP.y);
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	}
	
function mouseWheel(e)
	{
	e = e || window.event;
	punktZdarzenia(e);
	
	var d = 0;
	
	if (e.wheelDelta)
		{ // IE and Opera
		d = e.wheelDelta / 3600;
		}
	else if (e.detail)
		{// W3C
		d = e.detail / -90;
		}
	
	var matrix = mapa.element.getCTM();
	
	if(d<0) //przybliżenie
		{
		zoom *= 1.1;
		if (zoom > 100) zoom = 100;
		}
	if(d>0) //oddalenie
		{
		zoom /= 1.1;
		if (zoom < 0.5) zoom = 0.5;
		}
	
	//aktualny zoom
	var p2 = matrix.a;

	//współrzędne punktu na mapie
	var pX = (p.x-matrix.e)/p2; 
	var pY = (p.y-matrix.f)/p2;
			
	//przesuwamy mapę
	matrix.e -= (w*zoom - w*p2)/(w/pX);
	matrix.f -= (h*zoom - h*p2)/(h/pY);
	
	//przybliżamy
	matrix.a = matrix.d = zoom;
	
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	
	//zmniejszamy grubość linii
	mapa.woj.setAttribute('stroke-width',mapa.wojsz/zoom);
	mapa.pol.setAttribute('stroke-width',mapa.polsz/zoom);
		
	}
	
function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}