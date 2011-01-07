<?php
header('Content-type: image/svg+xml;charset=utf-8'); 
//header('Content-type: text/plain;charset=utf-8'); 
require 'granice.php';
require 'funkcje.php';
require 'drogi.php';

?>
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<svg	version="1.1"
		baseProfile="full"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xmlns:ev="http://www.w3.org/2001/xml-events"
		zoomAndPan="disable"
		>
	<script type="text/ecmascript" xlink:href="mapa.js" />
	<title>Drogowa Mapa Polski</title>
	
	<g id="mapa">
		<defs>
			
		<?php
		stworzWielokat($Polska, 'polska');
		?>
		
		</defs>
		<use fill="#FFFFEE" stroke="#555555" stroke-width="1.5" xlink:href="#polska" id="pol" />
		<g fill="none" stroke="#444444" stroke-width="0.5" id="wojewodztwa_polski">
			<?php
			foreach($w as $wid => $ww)
				{
				stworzWielokat($ww['g'], 'w_'.$wid, 'województwo '.$ww['n']);
				}
			//foreach($p as $p1)
			//	{
			//	$e = explode(',',trim($p1));
			//	echo '<circle cx="'.$e[0].'" cy="'.$e[1].'" r="1" fill="#ff0000" stroke="red" stroke-width="3" />';
			//	}
			foreach($d as $dr)
				{
				//echo '<polyline points="'.$dr['w'].'" fill="none" stroke="red" stroke-width="0.1" />';
				}
			?>
		</g>
	</g>
	<svg id="nawigacja" x="600" y="10" width="90" height="200">
		<rect width="100%" height="100%" fill="#999" opacity="0.05" rx="45" ry="50" stroke="#555"/>
		<g fill="#999" opacity="0.05" stroke="black">
		<path d="m 20 20 l  15  15 l   0  20 l -15  15 c -20 -25 -20 -25   0 -50 z" id="n_wlewo"/>
		<path d="m 70 20 l -15  15 l -20   0 l -15 -15 c  25 -20  25 -20  50   0 z" id="n_wgore" />
		<path d="m 70 70 l -15 -15 l   0 -20 l  15 -15 c  20  25  20  25   0  50 z" id="n_wprawo" />
		<path d="m 20 70 l  15 -15 l  20   0 l  15  15 c -25  20 -25  20 -50   0 z" id="n_wdol" />
		<path d="m 35 35 h 20 v 20 h -20 v -20 z" id="n_srodek" />
		</g>
	</svg>
</svg>