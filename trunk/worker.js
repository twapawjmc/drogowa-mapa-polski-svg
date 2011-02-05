var w={};

onmessage = function(event) {
if(event.data.start_granice || event.data.start_powiaty || event.data.start_miasta)
	{
	postMessage({info:{d:true,t:"Ładowanie...",b:"rgba(200,200,200,0.6)"}});
	var download=true;
	
	if(event.data.start_granice) 
		{
		var gr = event.data.start_granice;
		var q = 'granice';
		}
	else if(event.data.start_powiaty) 
		{
		var gr = event.data.start_powiaty;
		var q = 'powiaty';
		}
	else if(event.data.start_miasta) 
		{
		var gr = event.data.start_miasta;
		var q = 'miasta';
		}
	
	if(gr!=undefined && gr!==true)
		{
		w = JSON.parse(gr);
		var req = new XMLHttpRequest();
		req.open('GET', 'ajax.php?'+q+'&v', false);
		req.onreadystatechange = function (aEvt)
			{
			if (req.readyState == 4)
				{
				if(req.status == 200)
					{
					w.cv = JSON.parse(req.responseText).v;
					}
				else
					{
					postMessage({info:{d:true,t:"Błąd podczas ładowania strony.",b:"red"}});
					download=false;
					}
				}
			};
		req.send(null); 
		if(w.v == w.cv) download=false;
		}
	
	if(download)
		{
		postMessage({info:{d:true,t:"Pobieranie...",b:"rgba(200,200,200,0.6)"}});
		var req = new XMLHttpRequest();
		
		req.open('GET', 'ajax.php?'+q, true);
		req.onreadystatechange = function (aEvt)
			{
			if (req.readyState == 4)
				{
				if(req.status == 200)
					{
						postMessage({info:{d:false,t:"Pobrano...",b:"rgba(200,200,200,0.6)"}});
						w = JSON.parse(req.responseText);
						if(event.data.start_granice) postMessage({granice_ls:req.responseText});
						else if(event.data.start_powiaty) postMessage({powiaty_ls:req.responseText});
						else if(event.data.start_miasta) postMessage({miasta_ls:req.responseText});
						
						if(event.data.start_granice) start_gr();
					}
					else postMessage({info:{d:true,t:"Błąd podczas ładowania strony.",b:"red"}});
				}
			};
		req.send(null); 
		}
	else
		{
		if(event.data.start_granice) start_gr();
		postMessage({info:{d:false,t:"Nie pobrano...",b:"rgba(200,200,200,0.6)"}});
		}
	if(event.data.start_powiaty) postMessage({powiaty_koniec:true});
	else if(event.data.start_miasta) postMessage({miasta_koniec:true});
	}
};

function start_gr()
	{
	var x = new Array;
	postMessage({info:{d:true,t:"Sortowanie...",b:"rgba(200,200,200,0.6)"}});
	for(i=0;i<w.granice.length;i++)
		{
		postMessage({info:{d:true,t:"Sortowanie... ("+(i+1)+"/"+w.granice.length+")",b:"rgba(200,200,200,0.6)"}});
		for(j=0;j<w.granice[i].id.length;j++)
			{
			var idx = String(w.granice[i].id[j]);
			if(x[idx] == undefined) x[idx]=new Array;
			x[idx][x[idx].length] = w.granice[i].wsp;			
			}
		}
	
	var l = 0;
	var l2 = 0;
	for(var i in x) ++l;
	
	for(var i in x)
		{
		l2++;
		postMessage({info:{d:true,t:"Tworzenie wielokątów... ("+l2+"/"+l+")",b:"rgba(200,200,200,0.6)"}});
		postMessage({polygon_granice:{id:i,t:w.wojewodztwa[i],p:polaczOdcinki(x[i])}});
		}
	postMessage({info:{d:false,t:"",b:"rgba(200,200,200,0.6)"}});
	postMessage({polygon_granice_koniec:true});
	
	}
	
function polaczOdcinki(t)
{

var p=new Array;
var wzor = /^\s*([0-9.]+)\,([0-9.]+)(.*)$/;

for(i=0;;++i)
	{
	var koor = wzor.exec(t[0]);
	if(koor == null) break;
	p[i] = koor[1]+','+koor[2];
	t[0] = koor[3];
	}
var l = t.length;
	for(i=1;i<l;i++)
	{
		
		var liczbaWsp = p.length;
		var pPkt = p[0];

		var ostPkt = p[liczbaWsp-1];
		
		for(j=1;j<l*l;j++)
			{
			
			
			
			if(t[j]===false) continue;
			
			var aktGran2 = t[j];
			var wspAktGran2= new Array;
			for(s=0;;s++)
				{
				var koor = wzor.exec(aktGran2);
				if(koor == null) break;
				wspAktGran2[s] = koor[1]+','+koor[2];
				aktGran2 = koor[3];
				
				}
			
			var liczbaWsp2 = wspAktGran2.length;

			var pPkt2 = wspAktGran2[0];
			var ostPkt2 = wspAktGran2[liczbaWsp2-1];
			
			
			
			if(ostPkt == pPkt2)
				{
				p.pop();
				p = dodajTablice(p,wspAktGran2);
				t[j] = false;
				break;
				}
				
			else if(pPkt == ostPkt2)
				{
				p.shift();
				p = dodajTablice(wspAktGran2,p);
				t[j] = false;
				break;
				}
				
			else if(ostPkt == ostPkt2)
				{
				p.pop();
				p.reverse();
				p = dodajTablice(wspAktGran2,p);
				t[j] = false;
				break;
				}
				
			else if(pPkt == pPkt2)
				{
				p.shift();
				p.reverse();
				p = dodajTablice(p,wspAktGran2);
				t[j] = false;
				break;
				}
				
			if(pPkt == ostPkt)
			{
			break;
			}
			
			}
			
	if(pPkt == ostPkt)
		{
		p.pop();
		break;
		}
	
	}

return p;

}
	
function dodajTablice(tab1,tab2)
	{ 
	var x = (tab1+','+tab2).split(','); 
	var wzor = /^\s*([0-9.]+)\,([0-9.]+)\,*(.*)$/;
	var r = new Array;
	for(s=0;;s++)
		{
		var koor = wzor.exec(x);
		if(koor == null) break;
		r[s] = koor[1]+','+koor[2];
		x = koor[3];
		}	
	return r;
	}