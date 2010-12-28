var _svg = document.getElementById("_svg");

document.onmousemove = mouseMove;
document.onmouseup = mouseUp;

//_svg.zoomAndPan = 1;
document.addEventListener('DOMContentLoaded', load, false);
var mapa;

var maxpowiekszenie = 10; //maksymalne powiększenie
var powiekszenie = 1;
var minpowiekszenie = 0.1;	//minimalne powiększenie

var dragObject  = null;
var pozycjaMyszy = null;
var matrix = null;
var el = {};

var height = _svg.getAttribute('height');
var width = _svg.getAttribute('width');

function load()
	{
	mapa = document.getElementById("mapa");
	pobierzElementy();
	if(window.addEventListener)
			_svg.addEventListener('DOMMouseScroll', mouseWheel, false);
	//dla IE/OPERA etc
	_svg.onmousewheel = mouseWheel;
	
	_svg.onmousedown = mouseDown;
	
	matrix = mapa.transform.animVal.getItem(0).matrix;
	
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
		var pozycjaMyszy2 = mouseCoords(ev);
		
		//obliczamy przesunięcie kursora myszy
		x = pozycjaMyszy2.x - pozycjaMyszy.x ;
		y = pozycjaMyszy2.y - pozycjaMyszy.y ;
		
		//przesuwamy obiekt
		matrix.e += x;
		matrix.f += y;
		
		pozycjaMyszy = pozycjaMyszy2;
		return false;
		}
}	

function grubosc()
	{
	el.woj['e'].setAttribute('stroke-width',el.woj['g']/powiekszenie);
	el.pol['e'].setAttribute('stroke-width',el.pol['g']/powiekszenie);
	}


	
function mouseWheel(e) //funckja realizująza przybliżanie i oddalanie mapy
	{
	var d = kolkoMyszy(e);
	pozycjaMyszy = mouseCoords(e);
	if(d>0) //przybliżamy
		{
		if(powiekszenie==maxpowiekszenie) return;//nie da się już bardziej przybliżyć
		powiekszenie*=1.1;
		if(powiekszenie>maxpowiekszenie) powiekszenie=maxpowiekszenie;
		var myszX = pozycjaMyszy.x-(window.innerWidth/2);		
		var myszY = pozycjaMyszy.y-(window.innerHeight/2);
		console.log(myszX,myszY);
		
		}
	if(d<0) //oddalamy
		{
		if(powiekszenie==minpowiekszenie) return;//nie da się już bardziej oddalić
		powiekszenie/=1.1;
		if(powiekszenie<minpowiekszenie) powiekszenie=minpowiekszenie;
		
		var myszX = 0;
		var myszY = 0;
		
		}
		
		var a = (width*matrix.a-width*powiekszenie)/2 - myszX*powiekszenie/10;
		var b = (height*matrix.a-height*powiekszenie)/2 - myszY*powiekszenie/10;
		matrix.e += a;
		matrix.f += b;
		
		matrix.a = matrix.d = powiekszenie;
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