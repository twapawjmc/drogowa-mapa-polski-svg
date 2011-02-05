var object = window.frameElement;
var doc = object.ownerDocument;
var win = doc.defaultView;
var o = window.location.protocol +  '//' + window.location.host;
var _svg = document.documentElement;
var mapa = {};
var zoom = 1;
var pP; //mijesce poprzedniego darzenia
var p;
var w = window.innerWidth;
var h = window.innerHeight;
var svg_ns = "http://www.w3.org/2000/svg";

document.addEventListener('DOMContentLoaded', function(){

	mapa.element = document.getElementById("mapa");
	mapa.grub = new Array;

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
	
	restart();
	
	window.addEventListener('message', function(e){
	
	if(e.data.mapa_przybliz) przybliz(e.data.mapa_przybliz);
	if(e.data.mapa_reset) restart();
	if(e.data.mapa_przesun) przesun(e.data.mapa_przesun.x,e.data.mapa_przesun.y);
	
	}, false);
	
	var wojewodztwa = new Worker('worker.js');
	
	wojewodztwa.addEventListener( "message", function(event) {
		
		if(event.data.polygon)
				{
				var w = event.data.polygon;
				var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
				polygon.setAttribute("points", w.p);
				if(w.id=='polska')
				{
				polygon.setAttribute("stroke-width", 1);
				polygon.id="polska";
				w.t = "Polska";
				}
				else
				{
				polygon.setAttribute("stroke-width", 0.5);
				polygon.id='w_'+w.id;
				w.t = "województwo " + w.t;
				}
				
				var polygont = document.createElement("title");
				
				polygont.appendChild(document.createTextNode(w.t));
				
				polygon.appendChild(polygont);
				
				if(w.id=='polska') var el = document.getElementById('pol').appendChild(polygon);
				else var el = document.getElementById('woj').appendChild(polygon);
				
				mapa.grub[mapa.grub.length] = new Array(el,Number(el.getAttribute('stroke-width')));
				
				}
		if(event.data.close) wojewodztwa.terminate();
		
		if(event.data.info) info(event.data.info);
		if(event.data.alert) alert(event.data.alert);

			}, true );
	
	var woj;
	if(window.localStorage) woj = window.localStorage.getItem( 'woj' );
	wojewodztwa.postMessage({start:woj});
	
	win.postMessage({mapa_loaded:true}, o);

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
	win.postMessage({mapa_zoom:zoom}, o);
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
	win.postMessage({mapa_zoom:zoom}, o);

	}
	
function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}
	
function info(x)
	{
	win.postMessage({info:x}, o);
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