var _svg = document.getElementById("_svg");

document.onmousemove = mouseMove;
document.onmouseup = mouseUp;

//_svg.zoomAndPan = 1;
document.addEventListener('DOMContentLoaded', load, false);
var mapa;

var maxpowiekszenie = 0.01; //maksymalne powiększenie
var powiekszenie = 1;
var minpowiekszenie = 2;	//minimalne powiększenie

var dragObject  = null;
var pozycjaMyszy = null;
var viewBox;
var viewBoxs = null;
var el = {};

function load()
	{
	mapa = document.getElementById("mapa");
	
	if(window.addEventListener)
			mapa.addEventListener('DOMMouseScroll', mouseWheel, false);
	//dla IE/OPERA etc
	mapa.onmousewheel = mouseWheel;
	
	mapa.onmousedown = mouseDown
	
	pobierzElementy();
	}

function pobierzElementy()
	{
	el.woj = new Array();
	el.woj['e'] = document.getElementById("wojewodztwa_polski");
	el.woj['g'] = el.woj['e'].getAttribute('stroke-width');
	
	el.pol = new Array();
	el.pol['e'] = document.getElementById("pol");
	el.pol['g'] = Number(el.pol['e'].getAttribute('stroke-width'));
	}
	
function mouseDown(ev)
	{
	dragObject  = this;
	pozycjaMyszy = mouseCoords(ev);
	getSize();
	}	
	
function mouseCoords(ev) //funkcja pobierająca współrzędne kursora myszy
	{
	if(ev.pageX || ev.pageY)
		{
		return {x:ev.pageX, y:ev.pageY};
		}
	return {x:ev.clientX, y:ev.clientY};
	}
	
	
function mouseUp(ev)
	{
	mouseMove(ev);
	
	//wyłączamy przesuwanie mapy
	dragObject = null;
	}
	
function mouseMove(ev) //funckja obsługująca zdarzenie poruszania kursorem myszy
	{
	ev = ev || window.event;
	if(dragObject) //sprawdzamy czy obiekt można przesuwać
		{
		//pobieramy aktualne współrzędne kursora
		pozycjaMyszy2 = mouseCoords(ev);
		
		//obliczamy przesunięcie kursora myszy
		x = pozycjaMyszy2.x - pozycjaMyszy.x;
		y = pozycjaMyszy2.y - pozycjaMyszy.y;
		
		//przesuwamy obiekt
		setSize(viewBox[1]-x*powiekszenie,viewBox[2]-y*powiekszenie,viewBox[3],viewBox[4]);
		return false;
		}
}	

function grubosc()
	{
	el.woj['e'].setAttribute('stroke-width',el.woj['g']*powiekszenie);
	el.pol['e'].setAttribute('stroke-width',el.pol['g']*powiekszenie);
	}

function getSize()
	{
	var wzor = /^([-0-9.]+)\s([-0-9.]+)\s([-0-9.]+)\s([-0-9.]+)$/;
	viewBox = wzor.exec(mapa.getAttribute('viewBox'));
	viewBox[1] = Number(viewBox[1]);
	viewBox[2] = Number(viewBox[2]);
	viewBox[3] = Number(viewBox[3]);
	viewBox[4] = Number(viewBox[4]);
	if(viewBoxs == null) viewBoxs = viewBox;
	}
	
function setSize(a,b,c,d)
	{
	if(c < 0) c=0;
	if(d < 0) d=0;
	
	var v = a + ' ' + b + ' ' + c + ' ' + d;
	//console.log(v);
	mapa.setAttribute('viewBox',v);
	}

function mouseWheel(e) //funckja realizująza przybliżanie i oddalanie mapy
	{
	getSize();
	var d = kolkoMyszy(e);
	pozycjaMyszy = mouseCoords(e);
	if(d>0) //przybliżamy
		{
		if(powiekszenie==maxpowiekszenie) return;//nie da się już bardziej przybliżyć
		powiekszenie/=1.2;
		if(powiekszenie<maxpowiekszenie) powiekszenie=maxpowiekszenie;
		var myszX = pozycjaMyszy.x-(window.innerWidth/2);		
		var myszY = pozycjaMyszy.y-(window.innerHeight/2);
		
		
		}
	if(d<0) //oddalamy
		{
		if(powiekszenie==minpowiekszenie) return;//nie da się już bardziej oddalić
		powiekszenie*=1.2;
		if(powiekszenie>minpowiekszenie) powiekszenie=minpowiekszenie;
		
		var myszX = 0;
		var myszY = 0;
		
		}
		//viewBox[4] = aktualna wysokość
		//viewBox[3] = aktualna szerokość
		//viewBoxs[4]*powiekszenie = nowa wysokość
		//viewBoxs[3]*powiekszenie = nowa szerokość
		var a = viewBox[1]+(viewBox[3]-viewBoxs[3]*powiekszenie)/2+myszX*powiekszenie/5;
		var b = viewBox[2]+(viewBox[4]-viewBoxs[4]*powiekszenie)/2+myszY*powiekszenie/5;
		
		var c = viewBoxs[3]*powiekszenie;
		var d = viewBoxs[4]*powiekszenie;
		setSize(a,b,c,d);
		grubosc();
	}

function kolkoMyszy(event) //pobieramy ilość obrotów rolką myszy
	{
	var delta = 0;
	if (!event) event = window.event;
	// normalize the delta
	if (event.wheelDelta)
		{ // IE and Opera
		delta = event.wheelDelta / 60;
		}
	else if (event.detail)
		{// W3C
		delta = -event.detail / 2;
		}
	return delta;
	}