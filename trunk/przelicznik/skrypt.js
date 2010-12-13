function oblicz()
	{
	debug = 0;
	var wyniki = document.getElementById('wyniki');
	if(debug) wyniki.innerHTML = "";
	var x = 969; //max zachód w sekundach ["]
	var y = 6126; //max północ w sekundach ["]
	
	if(this.id == "przelicz")
		{
		//grX = 0.01910279079487745; //dla 52°N
		//grY = 0.031028075591010305;
		var sz1 = document.getElementById('szerokosc');
		var dl1 = document.getElementById('dlugosc');
		var sz2 = document.getElementById('szerokosc2');
		var dl2 = document.getElementById('dlugosc2');
		var sz = sz1.value;
		var dl = dl1.value;
		var wzor = /^\s*([0-9]{1,3})\°\s*(?:([0-9]{1,2})\'\s*)?(?:([0-9]{0,2}(?:\.\s*[0-9]{1,2})?)[\″\"]{1}\s*)?([SNEW])?\s*$/;
		if(!sz.match(/^\s*[0-9]{1,2}\°\s*([0-9]{1,2}\'\s*)?([0-9]{0,2}(\.\s*[0-9]{1,2})?[\″\"]{1}\s*)?[SN]?\s*$/)) sz = "BŁĄD";
		else
			{
			var szer = wzor.exec(sz);
			for(i=1;i<szer.length;++i)
				{
				szer[i]=Number(szer[i]); //konwersja ze stringa na liczbę
				if(debug) wyniki.innerHTML = wyniki.innerHTML + "szer[" + i + "] = " + szer[i] + '</br >';
				}
			
			sz = ((szer[1]*60)+((!isNaN(szer[2]))?(szer[2]):0))*60+((!isNaN(szer[3]))?(szer[3]):0);
			if(debug) wyniki.innerHTML = wyniki.innerHTML + "sz niezaokrąglona = " + sz + '</br >';
			//sz = Round(sz,2);
			if(debug) wyniki.innerHTML = wyniki.innerHTML + "sz zaokrąglona = " + sz + '</br >';
			}
		if(!dl.match(/^\s*[0-9]{1,3}\°\s*([0-9]{1,2}\'\s*)?([0-9]{0,2}(\.\s*[0-9]{1,2})?[\″\"]{1}\s*)?[EW]?\s*$/)) dl = "BŁĄD";
		else
			{
			var dlug = wzor.exec(dl);
			for(i=1;i<dlug.length;++i) 	
				{
				dlug[i]=Number(dlug[i]); //konwersja ze stringa na liczbę
				if(debug) wyniki.innerHTML = wyniki.innerHTML + "dlug[" + i + "] = " + dlug[i] + '</br >';
				}
			dl = ((dlug[1]*60)+((!isNaN(dlug[2]))?(dlug[2]):0))*60+((!isNaN(dlug[3]))?(dlug[3]):0);
			if(debug) wyniki.innerHTML = wyniki.innerHTML + "dl niezaokrąglona = " + dl + '</br >';
			//dl = Round(dl,2);
			if(debug) wyniki.innerHTML = wyniki.innerHTML + "dl zaokrąglona = " + dl + '</br >';
			}
		var xy = st2xy(dl,sz);
		sz2.value = Round(xy.y,2);
		dl2.value = Round(xy.x,2);
		var dlugosc = Round((xy.x-x),2);
		var szerokosc= Round((y-xy.y),2);
		if(!debug) wyniki.innerHTML = wyniki.innerHTML + dlugosc +','+ szerokosc +" ";
		}
	if(this.id == "przeliczk")
		{
		var k = document.getElementById('koordynaty');
		var sz2 = document.getElementById('szerokosc2');
		var dl2 = document.getElementById('dlugosc2');
		var z = k.value;
		var wzor = /^\s*([0-9.]+)\,([0-9.]+)\,([0-9.]+)(.*)$/;
		var a = new Array();
		for(i=0;;++i)
			{
			if(debug) wyniki.innerHTML = wyniki.innerHTML + 'z= ' + z + '</br >';
			var koor = wzor.exec(z);
			if(koor == null)
				{
				break;
				}
			koor[1] = Number(koor[1]);
			koor[2] = Number(koor[2]);
			var dl = koor[1]*3600;
			var sz = koor[2]*3600;
			var xy = st2xy(dl,sz);
			sz2.value = Round(xy.y,2);
			dl2.value = Round(xy.x,2);
			var dlugosc = Round((xy.x-x),2);
			var szerokosc = Round((y-xy.y),2);
			if(!debug) wyniki.innerHTML = wyniki.innerHTML + dlugosc +','+ szerokosc +" ";
			//wyniki.innerHTML = koor[1];
			z = koor[4];
			}
		
		}
	}
	
function Round(n, k) 
{
	var factor = Math.pow(10, k+1); 
	n = Math.round(Math.round(n*factor)/10); 
	return n/(factor/10); 
}



function st2xy(dl,sz,r)
{
debug;
var rz=6400;
var wyniki = document.getElementById('wyniki');
var xy = new Array();
if(debug) wyniki.innerHTML = wyniki.innerHTML + "dl w sekundach = " + dl + '</br >';
var dl = (dl/648000)*Math.PI; //dlugosc i szerokosc podane w sekundach zamienia na radiany
if(debug) wyniki.innerHTML = wyniki.innerHTML + "dl w radianach = " + dl + '</br >';
if(debug) wyniki.innerHTML = wyniki.innerHTML + "sz w sekundach = " + sz + '</br >';
var sz = (sz/648000)*Math.PI;
if(debug) wyniki.innerHTML = wyniki.innerHTML + "sz w radianach = " + sz + '</br >';
//var r = rz * Math.cos(sz); //mapka się robi krzywa...
var r = 3940.233442084213; //dla 52°N
if(debug) wyniki.innerHTML = wyniki.innerHTML + "r = " + r + '</br >';
var ObwX = 2*Math.PI*r;
if(debug) wyniki.innerHTML = wyniki.innerHTML + "ObwX = " + ObwX + '</br >';
var ObwY = 2*Math.PI*rz;
if(debug) wyniki.innerHTML = wyniki.innerHTML + "ObwY = " + ObwY + '</br >';
xy.x = (dl/(2*Math.PI))*ObwX;
if(debug) wyniki.innerHTML = wyniki.innerHTML + "x = " + xy.x + '</br >';
xy.y = (sz/(2*Math.PI))*ObwY;
if(debug) wyniki.innerHTML = wyniki.innerHTML + "y = " + xy.y + '</br >';
return xy;
}