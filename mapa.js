var doc = window.document;
var mapa = doc.getElementById("mapa");

document.onmousemove = mouseMove;
document.onmouseup = mouseUp;


if(window.addEventListener)
        mapa.addEventListener('DOMMouseScroll', zoom, false);
//dla IE/OPERA etc
mapa.onmousewheel = zoom;

var powiekszenie = 1;
var dragObject  = null;
var pozycjaMyszy = null;
var viewBox;
var viewBoxs = null;
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
	if(a<(-viewBoxs[3]/2)) a=(-viewBox[3]/2);
	else if(a>viewBoxs[3]) a=viewBox[3];
	if(b<(-viewBoxs[4]/2)) b=(-viewBox[4]/2);
	else if(b>viewBoxs[4]) b=viewBox[4];
	if(c < 0) c=0;
	if(d < 0) d=0;
	
	var v = a + ' ' + b + ' ' + c + ' ' + d;
	//console.log(v);
	mapa.setAttribute('viewBox',v);
	}

function przesuwaj(item)
	{
	if(!item) return;
	item.onmousedown = function(ev){
		dragObject  = this;
		pozycjaMyszy = mouseCoords(ev);
		getSize();
		return false;
		}
	}

function zoom(e)
	{
	getSize();
	var d = kolkoMyszy(e);
	pozycjaMyszy = mouseCoords(e);
	if(d>0) //przybliżamy
		{
		powiekszenie/=1.2;
		}
	if(d<0) //oddalamy
		{
		powiekszenie*=1.2;
		if(powiekszenie>1) powiekszenie=1;
		}
		//viewBox[4] = aktualna wysokość
		//viewBox[3] = aktualna szerokość
		//viewBoxs[4]*powiekszenie = nowa wysokość
		//viewBoxs[3]*powiekszenie = nowa szerokość
		
		var myszX = pozycjaMyszy.x-(window.innerWidth/2);		
		var myszY = pozycjaMyszy.y-(window.innerHeight/2);
		
		console.log(myszX,myszY);
		var a = viewBox[1]+(viewBox[3]-viewBoxs[3]*powiekszenie)/2+myszX*powiekszenie;
		var b = viewBox[2]+(viewBox[4]-viewBoxs[4]*powiekszenie)/2+myszY*powiekszenie;
		var c = viewBoxs[3]*powiekszenie;
		var d = viewBoxs[4]*powiekszenie;
	setSize(a,b,c,d);
	}

function kolkoMyszy(event)
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
	
function mouseUp(ev)
	{
	mouseMove(ev);
	dragObject = null;
	}
	
function mouseMove(ev){
	ev = ev || window.event;
	if(dragObject){
		pozycjaMyszy2 = mouseCoords(ev);
		x = pozycjaMyszy2.x - pozycjaMyszy.x;
		y = pozycjaMyszy2.y - pozycjaMyszy.y;
		setSize(viewBox[1]-x*powiekszenie,viewBox[2]-y*powiekszenie,viewBox[3],viewBox[4]);
		return false;
	}
}	
	
function mouseCoords(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}
	
przesuwaj(mapa);