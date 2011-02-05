<?php
header('Content-type: image/svg+xml;charset=utf-8'); 
//header('Content-type: text/plain;charset=utf-8'); 
require 'funkcje.php';
//require 'drogi/drogi.php';
require 'adm/wojewodztwa.php';
require 'adm/powiaty.php';
require 'adm/miasta.php';

?>
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<?xml-stylesheet href="mapa.css" type="text/css"?>
<svg	version="1.1"
		baseProfile="full"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xmlns:ev="http://www.w3.org/2001/xml-events"
		zoomAndPan="disable"
		>
	<script type="text/ecmascript" xlink:href="mapa2.js" />
	<title>Mapa</title>
	
	<g id="mapa" >
		<g id="pol"><?php pol(1);?></g>
		<g id="woj"><?php woj(0.5);?></g>
		<g id="pow"><?php powiaty(0.2);?></g>
		<g id="miasta"><?php miasta(0.1);?></g>
	
		
	</g>
	<svg id="nawigacja" y="30" width="90" height="220">
	<defs>
	<linearGradient id="gradient1">
		<stop offset="5%" stop-color="black" stop-opacity="1" />
		<stop offset="50%" stop-color="black" stop-opacity="0.5" />
		<stop offset="95%" stop-color="white" stop-opacity="0" />
	</linearGradient>
	<g id="n_strz">
		<path d="m 20 20 l  15  15 l   0  20 l -15  15 c -20 -25 -20 -25   0 -50 z"	/>
		<path d="m 15,37 -7,8 7,8 0,-5 17,0 0,-6 -17,0 z" stroke="none"	fill="url(#gradient1)"/>
	</g>
	</defs>
	<g id="g5" stroke="black" fill="#999" opacity="0.1">
    <use xlink:href="#n_strz" transform="translate(0 0) rotate(0)" id="n_wlewo" />
	<use xlink:href="#n_strz" id="n_wgore" transform="translate(90 0) rotate(90)" />
	<use xlink:href="#n_strz" transform="translate(90 90) rotate(180)" id="n_wprawo" />
	<use xlink:href="#n_strz" transform="translate(0 90) rotate(-90)" id="n_wdol" />
    <path d="m 35 35 h 20 v 20 h -20 v -20 z" id="n_srodek" />
	</g>
	<g id="g12">
    <path d="m 45 100 v 100 m -10 0 h 20 m -5 -25 h -10 m -5 -25 h 20 m -5 -25 h -10 m -5 -25 h 20 z" stroke="black" opacity="0.1" />
    <rect id="n_polesuwaka"	width="30" height="100"	x="30" y="100" stroke="#555" fill="#999" opacity="0.1" />
    <rect id="n_suwak" width="30" height="10" rx="30" ry="10" x="30" y="95" opacity="0.4" fill="#000000" />
	</g>
	</svg>
</svg>