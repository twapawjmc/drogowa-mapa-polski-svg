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
		>
	<title>Drogowa Mapa Polski</title>
		
	<defs>
		
	<?php
	stworzWielokat($Polska, 'polska');
	?>
	
	</defs>
	<use fill="#FFFFEE" stroke="#55AA55" stroke-width="0.2px" xlink:href="#polska" />
	<g fill="none" stroke="#44AA44" stroke-width="0.1px" id="wojewodztwa_polski">
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
			echo '<polyline points="'.$dr['w'].'" fill="none" stroke="red" stroke-width="0.3" />';
			}
		?>
	</g>
	
</svg>