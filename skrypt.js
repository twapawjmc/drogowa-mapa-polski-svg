var svg_object;
var svg_content;
var svg_document;


document.addEventListener('DOMContentLoaded', load, false);

function load()
	{
	svg_object = document.getElementById('mapa_svg');
	svg_object.onmessage=odbierz;
	}

function odbierz(e)
	{
	alert(e);
	}

	
