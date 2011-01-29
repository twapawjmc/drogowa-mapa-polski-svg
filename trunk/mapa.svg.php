<?php
header('Content-type: image/svg+xml;charset=utf-8'); 
//header('Content-type: text/plain;charset=utf-8'); 
require 'funkcje.php';
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
	<title>Drogowa Mapa Polski</title>
	
	<defs>
	<style type="text/css"><![CDATA[
	.miasto {
		fill: #888888;
		}
		]]></style>
  </defs>
	
	<g id="mapa">
		<polyline stroke="#002200" fill="#EEFFEE" stroke-width="2" id="polska" points="<?php echo $polska; ?>" 
		/>
		<g fill="rgba(0,0,0,0)" stroke="#003300" stroke-width="1" id="wojewodztwa">
			<?php
			foreach($w as $wid => $ww)
				{
				echo '<polygon id="w_'.$wid.'" points="'.$ww['g'].'" >'."\n";
				echo '<title>województwo '.$ww['n'].'</title>'."\n";
				echo '</polygon>'."\n";
				}
			?>
			
		</g>
		<g fill="none" stroke="none" stroke-width="0.3" id="powiaty">
		<?php
		foreach($w as $wid => $ww)
				{
				foreach($ww['p'] as $pw)
					{
					echo '<polygon '.(($pw['m']==true)?'class="miasto" ':'').'points="'.$pw['g'].'" >'."\n";
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
	</g>
	<svg id="nawigacja" x="600" y="10" width="90" height="220">
		<rect width="100%" height="100%" fill="#999" opacity="0.1" rx="45" ry="50" stroke="#555"/>
		<g fill="#999" opacity="0.1" stroke="black">
		<path d="m 20 20 l  15  15 l   0  20 l -15  15 c -20 -25 -20 -25   0 -50 z" id="n_wlewo"/>
		<path d="m 70 20 l -15  15 l -20   0 l -15 -15 c  25 -20  25 -20  50   0 z" id="n_wgore" />
		<path d="m 70 70 l -15 -15 l   0 -20 l  15 -15 c  20  25  20  25   0  50 z" id="n_wprawo" />
		<path d="m 20 70 l  15 -15 l  20   0 l  15  15 c -25  20 -25  20 -50   0 z" id="n_wdol" />
		<path d="m 35 35 h 20 v 20 h -20 v -20 z" id="n_srodek" />
		</g>
		<g >
		<path opacity="0.1" stroke="black" d="m 45 100 v 100 m -10 0 h 20 m -5 -25 h -10 m -5 -25 h 20 m -5 -25 h -10 m -5 -25 h 20 z" id="n_wlewo"/>
		<rect id="n_polesuwaka" width="30" height="100" x="30" y="100" fill="#999" opacity="0.1" stroke="#555"/>
		<rect id="n_suwak" width="30" height="5" fill="#000" opacity="0.4" rx="30" ry="5" x="30" y="98"/>
		</g>
		
	</svg>
</svg>