function oblicz()
	{
	var wyniki = document.getElementById('wyniki');
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
				}
			sz = ((szer[1]*60)+((!isNaN(szer[2]))?(szer[2]):0))*60+((!isNaN(szer[3]))?(szer[3]):0);
			}
		if(!dl.match(/^\s*[0-9]{1,3}\°\s*([0-9]{1,2}\'\s*)?([0-9]{0,2}(\.\s*[0-9]{1,2})?[\″\"]{1}\s*)?[EW]?\s*$/)) dl = "BŁĄD";
		else
			{
			var dlug = wzor.exec(dl);
			for(i=1;i<dlug.length;++i) 	
				{
				dlug[i]=Number(dlug[i]); //konwersja ze stringa na liczbę
				}
			dl = ((dlug[1]*60)+((!isNaN(dlug[2]))?(dlug[2]):0))*60+((!isNaN(dlug[3]))?(dlug[3]):0);
			}
		var xy = st2xy(dl,sz);
		sz2.value = Round(xy.y,4);
		dl2.value = Round(xy.x,4);
		var dlugosc = Round((xy.x-x),4);
		var szerokosc= Round((y-xy.y),4);
		wyniki.innerHTML = wyniki.innerHTML + dlugosc +','+ szerokosc +" ";
		}
	if(this.id == "przeliczzge" || this.id == "przeliczdoge")
		{
		var k = document.getElementById('koordynaty');
		var sz2 = document.getElementById('szerokosc2');
		var dl2 = document.getElementById('dlugosc2');
		var z = k.value;
		if(this.id == "przeliczzge") var wzor = /^\s*([0-9.]+)\,([0-9.]+)\,([0-9.]+)(.*)$/;
		if(this.id == "przeliczdoge") var wzor = /^\s*([0-9.]+)\,([0-9.]+)(.*)$/;
		for(i=0;;++i)
			{
			var koor = wzor.exec(z);
			if(koor == null)
				{
				break;
				}
			koor[1] = Number(koor[1]);
			koor[2] = Number(koor[2]);
			
			if(this.id == "przeliczzge") 
				{
				var dl = koor[1]*3600;
				var sz = koor[2]*3600;
				var xy = st2xy(dl,sz);
				var dlugosc = Round((xy.x-x),4);
				var szerokosc = Round((y-xy.y),4);
				wyniki.innerHTML = wyniki.innerHTML + dlugosc +','+ szerokosc +" ";
				z = koor[4];
				}
			if(this.id == "przeliczdoge")
				{
				var dl = koor[1]+x;
				var sz = y-koor[2];
				var st = xy2st(dl,sz);
				var dl2 = Round(st.dl/3600,6);
				var sz2 = Round(st.sz/3600,6);
				wyniki.innerHTML = wyniki.innerHTML + dl2 +','+ sz2 +",0 ";
				z = koor[3];
				}
			}
		
		}
	}
	
function Round(n, k) 
{
	var factor = Math.pow(10, k+1); 
	n = Math.round(Math.round(n*factor)/10); 
	return n/(factor/10); 
}



function st2xy(dl,sz)
{
var dl2 = dl;
var sz2 = sz;
var rz=6400;
var wyniki = document.getElementById('wyniki');
var xy = new Array();
var dl = (dl/648000)*Math.PI; //dlugosc i szerokosc podane w sekundach zamienia na radiany
var sz = (sz/648000)*Math.PI;
var r = 3940.233442084213; //dla 52°N
xy.x = dl*r;
xy.y = sz*rz;
return xy;
}


function xy2st(x,y)
{
var rz=6400;
var wyniki = document.getElementById('wyniki');
var st = new Array();
var r = 3940.233442084213; //dla 52°N
var dl = x/r;
var sz = y/rz;
st.dl = (dl*648000)/Math.PI; //dlugosc i szerokosc podane w sekundach zamienia na radiany
st.sz = (sz*648000)/Math.PI;
return st;
}
