var nav = {};
var pP = {}; //mijesce poprzedniego darzenia
var p = {};
var object = window.frameElement;
var doc = object.ownerDocument;
var win = doc.defaultView;
var o = window.location.protocol +  '//' + window.location.host;

document.addEventListener('DOMContentLoaded', function(){

	nav.element = document.getElementById("nawigacja");
	nav.wlewo = document.getElementById("n_wlewo");
	nav.wprawo = document.getElementById("n_wprawo");
	nav.wgore = document.getElementById("n_wgore");
	nav.wdol = document.getElementById("n_wdol");
	nav.srodek = document.getElementById("n_srodek");
	nav.suwak = document.getElementById("n_suwak");
	nav.polesuwaka = document.getElementById("n_polesuwaka");

	nav.przesuw = false;
	
	document.onmouseup = function(e)
		{
		nav.przenos = false;
		nav.przesuw = false;
		};

	nav.wlewo.onmousedown = function(){nav.przenos = true;przesuwaj(10,0,10);};
	nav.wprawo.onmousedown = function(){nav.przenos = true;przesuwaj(-10,0,10);};
	nav.wgore.onmousedown = function(){nav.przenos = true;przesuwaj(0,10,10);};
	nav.wdol.onmousedown = function(){nav.przenos = true;przesuwaj(0,-10,10);};
	nav.srodek.onclick = function(){win.postMessage({mapa_reset:true}, o);};
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

	win.postMessage({nav_loaded:true}, o);
	
	window.addEventListener('message', function(e){
	
	if(e.data.mapa_zoom) nav.suwak.setAttribute('y',95 + 50*Math.log(e.data.mapa_zoom)/Math.log(10));
	
	}, false);

}, false);

function suwak(e)
	{
	if(!nav.przesuw) return;
	punktZdarzenia(e);
	var y = Number(nav.suwak.getAttribute('y'));
	
	y += (p.y - pP.y);
	if(y<95)y=95;
	if(y>195)y=195;
	
	var zoom = Math.pow(10,(y-95)/50);
	
	win.postMessage({mapa_przybliz:zoom}, o);
	
	nav.suwak.setAttribute('y',y);
	
	}
	
function przesuwaj(x,y,z)
	{
	if(!nav.przenos) return;
	
	win.postMessage({mapa_przesun:{x:x,y:y}}, o);
	window.setTimeout(function(){przesuwaj(x,y,z);},z);
	}

function punktZdarzenia(e)
	{
	pP = p;
	p = {x:e.clientX,y:e.clientY};
	}