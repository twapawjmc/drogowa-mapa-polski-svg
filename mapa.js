var _svg = document.documentElement;
var mapa = {};
var nav = {};
var pP; //mijesce poprzedniego darzenia
var p;
var zoom = 1;
var w = window.innerWidth;
var h = window.innerHeight;

ustawZdarzenia(_svg);

//ustawiamy obsługę zdarzeń
function ustawZdarzenia(_svg)
	{
	
	_svg.onmousemove = mouseMove;
	_svg.onmouseup = mouseUp;

	if(window.addEventListener)
		_svg.addEventListener('DOMMouseScroll', mouseWheel, false);
	
	document.addEventListener('DOMContentLoaded', function(e){
	
		mapa.element = document.getElementById("mapa");
		mapa.element.onmousedown = mouseDown;
		mapa.element.onmousewheel = mouseWheel;
		
		mapa.woj = document.getElementById("wojewodztwa_polski");
		mapa.wojsz = Number(mapa.woj.getAttribute('stroke-width'));
		mapa.pol = document.getElementById("pol");
		mapa.polsz = Number(mapa.pol.getAttribute('stroke-width'));
		mapa.przenos = false;
		mapa.tA = mapa.element.transform.animVal;
		mapa.tB = mapa.element.transform.baseVal;
		
		nav.element = document.getElementById("nawigacja");
		nav.wlewo = document.getElementById("n_wlewo");
		nav.wprawo = document.getElementById("n_wprawo");
		nav.wgore = document.getElementById("n_wgore");
		nav.wdol = document.getElementById("n_wdol");
		nav.srodek = document.getElementById("n_srodek");
		
		nav.wlewo.onmousedown = function(){mapa.przenos = true;przesuwaj(10,0,10);};
		nav.wprawo.onmousedown = function(){mapa.przenos = true;przesuwaj(-10,0,10);};
		nav.wgore.onmousedown = function(){mapa.przenos = true;przesuwaj(0,10,10);};
		nav.wdol.onmousedown = function(){mapa.przenos = true;przesuwaj(0,-10,10);};
		nav.srodek.onmousedown = wysrodkuj;
		
		var t = mapa.m =  mapa.tB.createSVGTransformFromMatrix(mapa.element.getCTM());
		if(mapa.tB.numberOfItems == 0) mapa.tB.clear();
		mapa.tB.appendItem(t);
		
		}, false);
	}
	
function grubosc()
	{
	mapa.woj.setAttribute('stroke-width',mapa.wojsz/zoom);
	mapa.pol.setAttribute('stroke-width',mapa.polsz/zoom);
	}
	
function wysrodkuj()
	{
	var matrix = _svg.createSVGMatrix();
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	zoom = 1;
	grubosc();
	}	
	
function przesuwaj(x,y,z)
	{
	if(!mapa.przenos) return;
	var matrix = mapa.element.getCTM();
	matrix.e += x;
	matrix.f += y;
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	window.setTimeout(function(){przesuwaj(x,y,z);},z);
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
	
	przybliz(zoom,p.x,p.y);
		
	}
	
function przybliz(z,x,y)
	{
	
	//jeśli nie podamy współrzędnych punktu do którego przybliżyć to przybliżamy go do środka ekranu
	if(x==undefined || y==undefined)
		{
		x=w/2;
		y=h/2;
		}
	
	zoom = z;
	
	var matrix = mapa.element.getCTM();
	
	//aktualny zoom
	var zoom2 = matrix.a;

	//współrzędne punktu na mapie
	var pX = (x-matrix.e)/zoom2; 
	var pY = (y-matrix.f)/zoom2;
			
	//przesuwamy mapę
	matrix.e -= (w*zoom - w*zoom2)*pX/w;
	matrix.f -= (h*zoom - h*zoom2)*pY/h;
	
	//przybliżamy
	matrix.a = matrix.d = zoom;
	
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	
	grubosc();
	}
	
function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}