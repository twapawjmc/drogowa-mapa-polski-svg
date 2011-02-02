<?php
header('Content-type: image/svg+xml;charset=utf-8'); 
//header('Content-type: text/plain;charset=utf-8'); 
require 'funkcje.php';
require 'drogi/drogi.php';
require 'adm/wojewodztwa.php';

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
	<title>Mapa</title>
	
	<defs>
	<style type="text/css"><![CDATA[
	#polska { stroke:#003300; fill:#EEFFEE; }
	#wojewodztwa { stroke:#002200; stroke-width:0.5; fill:rgba(0,0,0,0); }
	#powiaty { stroke:#005500; stroke-width:0.1; fill:rgba(0,0,0,0); }
	#miasta polygon { fill: #CCCCCC; stroke:white; stroke-width:0.5; }
	#miasta > polygon.miastop { fill: #888888; display:block; }
	#drogi { fill: none; stroke:red; stroke-width:1; }
	#drogi .s { stroke:green;}
		]]></style>
  </defs>
	
	<g id="mapa" >
		<?php stworzWielokat(&$Polska, 'polska');?>
		<g id="wojewodztwa">
			<?php
			foreach($w as $wid => $ww)
				{
				stworzWielokat(&$ww['g'], $wid, 'województwo '.$ww['n']);
				}
			?>
			
		</g>
		<g id="powiaty">
		<?php
		foreach($w as $ww)
				{
				foreach($ww['p'] as $pw)
					{
					echo '<polygon '.(($pw['m']==true)?'class="p_grodzki" ':'').'points="'.$pw['g'].'" >'."\n";
					echo '<title>'.(($pw['m']==true)?'':'powiat ').$pw['n'].'</title>'."\n";
					echo '</polygon>'."\n";
					if(isset($pw['g2']))
						{
						echo '<polygon points="'.$pw['g2'].'" >'."\n";
						echo '<title>powiat '.$pw['n'].'</title>'."\n";
						echo '</polygon>'."\n";
						if(isset($pw['g3']))
							{
							echo '<polygon points="'.$pw['g3'].'" >'."\n";
							echo '<title>powiat '.$pw['n'].'</title>'."\n";
							echo '</polygon>'."\n";
							}
						}
					}
				}
		?>
		</g>
		<g id="miasta">
		<?php
		foreach($w as $ww)
			{
			foreach($ww['m'] as $mw)
				{
				echo '<polygon '.(($mw['p']==true)?'class="miastop" ':'class="miastoz" ').'points="'.$mw['g'].'" >'."\n";
				echo '<title>'.$mw['n'].'</title>'."\n";
				echo '</polygon>'."\n";
				}
			}
			?>
			
		</g>
		<g id="drogi">
		<?php
		foreach($drogi as $r => $rodzaj)
			{
			foreach($rodzaj as $n => $numer)
				{
					foreach($numer as $odcinek)
					{
						echo '<polyline class="'.$r.' '.$n.'" points="'.$odcinek['g'].'" >'."\n";
						echo '<title>'.$rodzaj['s'].$n.'</title>'."\n";
						echo '</polyline>'."\n";
					}
				}
			}
			?>
			
		</g>
	</g>
</svg>