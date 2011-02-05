<?php

include 'swietokrzyskie/miasta.php';
include 'malopolskie/miasta.php';
include 'podkarpackie/miasta.php';
include 'lubelskie/miasta.php';
include 'podlaskie/miasta.php';
include 'warminsko-mazurskie/miasta.php';
include 'pomorskie/miasta.php';
include 'zachodniopomorskie/miasta.php';
include 'lubuskie/miasta.php';
include 'dolnoslaskie/miasta.php';
include 'opolskie/miasta.php';
include 'slaskie/miasta.php';
include 'wielkopolskie/miasta.php';
include 'kujawsko-pomorskie/miasta.php';
include 'lodzkie/miasta.php';
include 'mazowieckie/miasta.php';

$v = array('v'=>'0.1');
function miasta($sw)
	{
	global $w;
	foreach($w as $ww)
		{
		foreach($ww['m'] as $mw)
			{
			echo '<polygon stroke-width="'.$sw.'" '.(($mw['p']==true)?'class="miastop" ':'class="miastoz" ').'points="'.$mw['g'].'" >'."\n";
			echo '<title>'.$mw['n'].'</title>'."\n";
			echo '</polygon>'."\n";
			}
		}
	}

?>