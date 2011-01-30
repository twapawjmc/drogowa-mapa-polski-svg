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
	
	document.addEventListener('DOMContentLoaded', function(e){
	
		mapa.element = document.getElementById("mapa");
		
		_svg.onmousemove = mouseMove;
		_svg.onmouseup = function(e)
			{
			mapa.przenos = false;
			nav.przesuw = false;
			};
		
		_svg.addEventListener('DOMMouseScroll', mouseWheel, false);
		_svg.onmousewheel = mouseWheel;
		_svg.onmousedown = function(e){
			e = e || window.event;
			punktZdarzenia(e);
			mapa.przenos = true;
			};
		
		mapa.woj = document.getElementById("wojewodztwa");
		mapa.wojsz = 1;
		mapa.pow = document.getElementById("powiaty");
		mapa.powsz = Number(mapa.pow.getAttribute('stroke-width'));
		mapa.mi = document.getElementById("miasta");
		mapa.misz = Number(mapa.mi.getAttribute('stroke-width'));
		mapa.pol = document.getElementById("polska");
		mapa.polsz = 1;
		mapa.przenos = false;
		mapa.tA = mapa.element.transform.animVal;
		mapa.tB = mapa.element.transform.baseVal;
		
		nav.element = document.getElementById("nawigacja");
		nav.wlewo = document.getElementById("n_wlewo");
		nav.wprawo = document.getElementById("n_wprawo");
		nav.wgore = document.getElementById("n_wgore");
		nav.wdol = document.getElementById("n_wdol");
		nav.srodek = document.getElementById("n_srodek");
		nav.suwak = document.getElementById("n_suwak");
		nav.polesuwaka = document.getElementById("n_polesuwaka");
		
		nav.przesuw = false;
		
		nav.wlewo.onmousedown = function(){mapa.przenos = true;przesuwaj(10,0,10);};
		nav.wprawo.onmousedown = function(){mapa.przenos = true;przesuwaj(-10,0,10);};
		nav.wgore.onmousedown = function(){mapa.przenos = true;przesuwaj(0,10,10);};
		nav.wdol.onmousedown = function(){mapa.przenos = true;przesuwaj(0,-10,10);};
		nav.srodek.onmousedown = wysrodkuj;
		nav.suwak.onmousedown = function(e){
			e = e || window.event;
			punktZdarzenia(e);
			nav.przesuw = true;
		};
		nav.element.onmousemove = suwak;
		nav.polesuwaka.onclick = function(e){
			e = e || window.event;
			nav.przesuw = true;
			p.y = Number(nav.suwak.getAttribute('y'))+10;
			punktZdarzenia(e);
			suwak(e);
			nav.przesuw = false;
			
		};
		
		var t = mapa.m =  mapa.tB.createSVGTransformFromMatrix(mapa.element.getCTM());
		if(mapa.tB.numberOfItems == 0) mapa.tB.clear();
		mapa.tB.appendItem(t);
		
		}, false);
	}
	
function grubosc()
	{
	mapa.woj.setAttribute('stroke-width',mapa.wojsz/zoom);
	mapa.pow.setAttribute('stroke-width',mapa.powsz/zoom);
	mapa.pol.setAttribute('stroke-width',mapa.polsz/zoom);
	mapa.mi.setAttribute('stroke-width',mapa.misz/zoom);
	}
	
function widok()
	{
	if(zoom<2.5) 
		{
		mapa.woj.setAttribute('fill','rgba(0,0,0,0)');
		mapa.pow.setAttribute('fill','none');
		mapa.pow.setAttribute('stroke','none');
		}
	else
		{
		mapa.pow.setAttribute('fill','rgba(0,0,0,0)');
		mapa.woj.setAttribute('fill','none');
		mapa.pow.setAttribute('stroke','#005500');
		}
	}
	
function wysrodkuj()
	{
	var matrix = _svg.createSVGMatrix();
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	przybliz(1)
	nav.suwak.setAttribute('y',98);
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
	
function suwak(e)
	{
	if(!nav.przesuw) return;
	
	var y = Number(nav.suwak.getAttribute('y'));
	
	y += (p.y - pP.y);
	if(y<98)y=98;
	if(y>197)y=197;
	
	przybliz(Math.pow(10,(y-97)/50));
	
	nav.suwak.setAttribute('y',y);
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

	//współrzędne punktu na mapie
	var pX = (x-matrix.e)/zoom2; 
	var pY = (y-matrix.f)/zoom2;
			
	//przesuwamy mapę
	matrix.e -= (zoom - zoom2)*pX;
	matrix.f -= (zoom - zoom2)*pY;
	
	//przybliżamy
	matrix.a = matrix.d = zoom;
	
	var t = mapa.tB.createSVGTransformFromMatrix(matrix);
	mapa.tB.replaceItem(t,0);
	
	nav.suwak.setAttribute('y',97 + 50*Math.log(zoom)/Math.log(10));
	
	grubosc();
	widok();
	}
	
function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}
