<?php
header('Content-type: image/svg+xml;charset=utf-8'); 
//header('Content-type: text/plain;charset=utf-8'); 
require 'granice.php';




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
	<use fill="#FFFFEE" stroke="#55AA55" stroke-width="1px" xlink:href="#polska" />
	<g fill="none" stroke="#44AA44" stroke-width="0.4px" id="wojewodztwa_polski">
		<?php
		foreach($w[1] as $t => $n)
			{
			//czekaj();
			stworzWielokat($n, $t);
			}
		//foreach($p as $p1)
		//	{
		//	$e = explode(',',trim($p1));
		//	echo '<circle cx="'.$e[0].'" cy="'.$e[1].'" r="1" fill="#ff0000" stroke="red" stroke-width="3" />';
		//	}
		?>
	</g>
	
</svg>
<?php
function stworzWielokat($tt, $id)
	{
	$dbg=0;
	$polygon = '<polygon id="'.$id.'" points="';
	$p = explode("\r\n",$tt[0]);
	$l = sizeof($tt);
	if($l > 1)
		{
		for($i=1;$i<=$l;$i++)
			{
			if($dbg) echo " ".'['.'i='.$i.']'."\n";
			$liczbaWsp = sizeof($p);
			if($dbg) var_dump($p);
			if($dbg) echo '[liczbaWsp='.$liczbaWsp.']';
			$pPkt = $p[0];
			if($dbg) echo '[pPkt='.$pPkt.']';
			$ostPkt = $p[$liczbaWsp-1];
			if($dbg) echo '[ostPkt='.$ostPkt.']';
			if($dbg) echo "\n".'['.$pPkt.','.$p[1].'...'.$p[$liczbaWsp-2].','.$ostPkt.']'."\n";
			for($j=1;$j<$l;$j++)
				{
				if($dbg) echo "\n"."\t".'['.'j='.$j.']'."\n";
				if($tt[$j] == null) continue;
				$aktGran2 = trim($tt[$j]);
				$wspAktGran2 = explode("\r\n",$aktGran2);
				$liczbaWsp2 = sizeof($wspAktGran2);
				if($dbg) echo "\n"."\t".'['.'liczbaWsp2='.$liczbaWsp2.']'."\n";
				$pPkt2 = $wspAktGran2[0];
				if($dbg) echo "\n"."\t".'['.'pPkt2='.$pPkt2.']'."\n";
				$ostPkt2 = $wspAktGran2[$liczbaWsp2-1];
				if($dbg) echo "\n"."\t".'['.'ostPkt2='.$ostPkt2.']'."\n";
				if($dbg) echo "\n"."\t".'['.$pPkt2.','.$wspAktGran2[1].'...'.$wspAktGran2[$liczbaWsp2-2].','.$ostPkt2.']'."\n";
				if(strcmp($ostPkt,$pPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(1)'.$ostPkt.'|'.$pPkt2.']'."\n";
					unset($wspAktGran2[0]);
					$p = array_merge($p, $wspAktGran2);
					$tt[$j] = null;
					break;
					}
				if(strcmp($pPkt,$ostPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(2)'.$pPkt.'|'.$ostPkt2.']'."\n";
					unset($p[0]);
					$p = array_merge($wspAktGran2,$p);
					$tt[$j] = null;
					break;
					}
				if(strcmp($ostPkt,$ostPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(3)'.$ostPkt.'|'.$ostPkt2.']'."\n";
					$wspAktGran2 = odwroc($wspAktGran2);
					unset($wspAktGran2[0]);
					$p = array_merge($p, $wspAktGran2);
					$tt[$j] = null;
					break;
					}
				if(strcmp($pPkt,$pPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(4)'.$pPkt.'|'.$pPkt2.']'."\n";
					$wspAktGran2 = odwroc($wspAktGran2);
					unset($p[0]);
					$p = array_merge($wspAktGran2,$p);
					$tt[$j] = null;
					break;
					}
				}
			if(strcmp($pPkt,$ostPkt) == 0) break;
			}
		echo "\n"."\n";
		}
	$polygon .= implode(' ',$p).'"/>';
	echo $polygon;
	}
	
	function odwroc($a)
		{
		$b = array();
		foreach($a as $x)
			{
			$y = array($x);
			$b = array_merge($y, $b);
			}
		return $b;
		}
		
	function czekaj()
		{
		for($i=0;$i<10000000;$i++);
		}
?>