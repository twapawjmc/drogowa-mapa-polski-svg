var object = window.frameElement;
var doc = object.ownerDocument;
var win = doc.defaultView;
var _svg = document.documentElement;
var mapa = {};
var zoom = 1;
var pP; //mijejce poprzedniego darzenia
var p;
var w = window.innerWidth;
var h = window.innerHeight;
var svg_ns = "http://www.w3.org/2000/svg";
var nav = {};

document.addEventListener('DOMContentLoaded', function(){

	mapa.element = document.getElementById("mapa");
	mapa.grub = new Array;
	
	nav.element = document.getElementById("nawigacja");
	nav.wlewo = document.getElementById("n_wlewo");
	nav.wprawo = document.getElementById("n_wprawo");
	nav.wgore = document.getElementById("n_wgore");
	nav.wdol = document.getElementById("n_wdol");
	nav.srodek = document.getElementById("n_srodek");
	nav.suwak = document.getElementById("n_suwak");
	nav.polesuwaka = document.getElementById("n_polesuwaka");

	nav.przesuw = false;

	_svg.onmousemove = mouseMove;
	_svg.onmouseup = function(e)
		{
		mapa.przenos = false;
		};

	_svg.addEventListener('DOMMouseScroll', mouseWheel, false);
	_svg.onmousewheel = mouseWheel;
	_svg.onmousedown = function(e)
		{
		e = e || window.event;
		punktZdarzenia(e);
		mapa.przenos = true;
		};

	mapa.przenos = false;
	mapa.tA = mapa.element.transform.animVal;
	mapa.tB = mapa.element.transform.baseVal;
	
	var els = document.getElementsByTagName('polygon');
	for(i=0;i<els.length;i++)
		{
		var el = els[i];
		mapa.grub[mapa.grub.length] = new Array(el,Number(el.getAttribute('stroke-width')));
		
		}
	
	restart();
	
	document.onmouseup = function(e)
		{
		nav.przenos = false;
		nav.przesuw = false;
		};

	nav.wlewo.onmousedown = function(){nav.przenos = true;przesuwaj(10,0,10);};
	nav.wprawo.onmousedown = function(){nav.przenos = true;przesuwaj(-10,0,10);};
	nav.wgore.onmousedown = function(){nav.przenos = true;przesuwaj(0,10,10);};
	nav.wdol.onmousedown = function(){nav.przenos = true;przesuwaj(0,-10,10);};
	nav.srodek.onclick = restart;
	nav.suwak.onmousedown = function(e){
		e = e || window.event;
		punktZdarzenia(e);
		nav.przesuw = true;
		};
	nav.element.onmousemove = suwak;
	nav.polesuwaka.onclick = function(e){
		e = e || window.event;
		nav.przesuw = true;
		p.y = Number(nav.suwak.getAttribute('y'))+5;
		suwak(e);
		nav.przesuw = false;	
		};

}, false);

function restart()
	{
	var matrix = _svg.createSVGMatrix();
	matrix.e = window.innerWidth/2-690/2;
	matrix.f = window.innerHeight/2-653/2;
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	if(mapa.tB.numberOfItems != 0) mapa.tB.clear();
	mapa.tB.appendItem(t);
	zoom = 1;
	grubosc();
	nav.suwak.setAttribute('y',95 + 50*Math.log(zoom)/Math.log(10));
	}
	
function przesun(x,y)
	{
	var matrix = mapa.element.getCTM();
	matrix.e += x;
	matrix.f += y;
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	}

function mouseMove(e)
	{
	e = e || window.event;
	punktZdarzenia(e);
	if(!mapa.przenos) return;
	przesun(p.x - pP.x,p.y - pP.y);
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
		if (zoom < 1) zoom = 1;
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
	
	//różnica przybliżeń
	var r = zoom - zoom2;

	//współrzędne punktu na mapie
	var pX = (x-matrix.e)/zoom2; 
	var pY = (y-matrix.f)/zoom2;
			
	//przesuwamy mapę
	matrix.e -= r*pX;
	matrix.f -= r*pY;
	
	//przybliżamy
	matrix.a = matrix.d = zoom;
	
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	grubosc();
	nav.suwak.setAttribute('y',95 + 50*Math.log(zoom)/Math.log(10));

	}
	
function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}
	
function grubosc()
	{
	mapa.element.style.display = "none";
	for(i=0;i<mapa.grub.length;i++)
	{
	mapa.grub[i][0].setAttribute('stroke-width',mapa.grub[i][1]/zoom);
	}
	
	mapa.element.style.display = "block";
	}

function suwak(e)
	{
	if(!nav.przesuw) return;
	punktZdarzenia(e);
	var y = Number(nav.suwak.getAttribute('y'));
	
	y += (p.y - pP.y);
	if(y<95)y=95;
	if(y>195)y=195;
	
	var zoom = Math.pow(10,(y-95)/50);
	
	przybliz(zoom);
	
	nav.suwak.setAttribute('y',y);
	
	}
	
function przesuwaj(x,y,z)
	{
	if(!nav.przenos) return;
	
	przesun(x,y);
	window.setTimeout(function(){przesuwaj(x,y,z);},z);
	}

function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}