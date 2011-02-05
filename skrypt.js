var svg_object;
var svg_doc;
var svg_loaded = false;
var doc_loaded = false;
var nav_loaded = false;
var zoom;
var mm;
var mn;
var o = window.location.protocol +  '//' + window.location.host;
var info;
var x = new Array;
var l = true;

addEvent(window, 'message', function(e){
	if(e.data==='mapa_loaded')
		{
		mm = e.source;
		svg_loaded = true;
		nav_loaded = true;
		load();
		}
	if(e.data.mapa_loaded==true)
		{
		mm = e.source
		svg_loaded = true;
		load();
		}
	else if(e.data.nav_loaded==true)
		{
		mn = e.source
		nav_loaded = true;
		load();
		}
	else if(e.data.mapa_przybliz)
		{
		zoom = e.data.mapa_przybliz;
		mm.postMessage({mapa_przybliz:zoom}, o);
		}
	else if(e.data.mapa_reset) mm.postMessage({mapa_reset:true}, o);
	else if(e.data.mapa_zoom && nav_loaded) mn.postMessage({mapa_zoom:e.data.mapa_zoom}, o);
	else if(e.data.mapa_przesun) mm.postMessage({mapa_przesun:e.data.mapa_przesun}, o);
	else if(e.data.info && doc_loaded)
		{
		if(info == undefined)var info = document.getElementById('info');
		if(e.data.info.d) info.parentNode.style.display='block';
		else info.parentNode.style.display='none';
		info.innerHTML=e.data.info.t;
		info.style.backgroundColor=e.data.info.b;
		}
		
});

addEvent(document,'DOMContentLoaded', function(){
	doc_loaded = true;
	load();
	var easyv = document.getElementById('easyv')
	
	if(easyv) addEvent(easyv, 'click', function(){
		document.getElementById('mapa').setAttribute('data','mapa.svg.php');
		var nav = document.getElementById('nawigacja');
		nav.parentNode.removeChild(nav);
		document.getElementById('info').parentNode.style.display = "none";
		document.getElementById('lewaKolumna').style.display = "none";
	});
	
	var lKzwin = document.getElementById('lKzwin');
	addEvent(lKzwin, 'click', function(){
		if(l == true)
			{
			var i = 250
			var t = setInterval(function(){
				i-=5;
				document.getElementById('lewaKolumna').style.width = i+"px";
				if(i==10) clearInterval(t);
			},30)
			lKzwin.innerText = "+";
			l = false;
			}
		else
			{
			var i = 10
			var t = setInterval(function(){
				i+=5;
				document.getElementById('lewaKolumna').style.width = i+"px";
				if(i==250) clearInterval(t);
			},30)
			lKzwin.innerText = "-";
			l = true;
			}
		
	});
	
});

function load()
	{
	if(!svg_loaded || !doc_loaded || !nav_loaded) return;
	info = document.getElementById('info');
	info.parentNode.style.display='none';
	svg_object = document.getElementById('mapa');
	svg_doc = svg_object.contentDocument;
	}
	
function addEvent(node, eventName, func)
 {
   if(node.addEventListener)
     node.addEventListener(eventName, func, false);
   else
     node.attachEvent('on' + eventName, func);
 }
