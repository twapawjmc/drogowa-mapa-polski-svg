<?php
include 'swietokrzyskie/powiaty.php';
include 'lodzkie/powiaty.php';
include 'mazowieckie/powiaty.php';
include 'warminsko-mazurskie/powiaty.php';
include 'malopolskie/powiaty.php';
include 'podkarpackie/powiaty.php';
include 'lubelskie/powiaty.php';
include 'podlaskie/powiaty.php';
include 'pomorskie/powiaty.php';
include 'zachodniopomorskie/powiaty.php';
include 'lubuskie/powiaty.php';
include 'wielkopolskie/powiaty.php';
include 'kujawsko-pomorskie/powiaty.php';
include 'dolnoslaskie/powiaty.php';
include 'opolskie/powiaty.php';
include 'slaskie/powiaty.php';

$v = array('v'=>'0.1');
function powiaty($sw)
	{
	global $w;
	foreach($w as $ww)
		{
		foreach($ww['p'] as $pw)
			{
			echo '<polygon stroke-width="'.$sw.'" '.(($pw['m']==true)?'class="p_grodzki" ':'').'points="'.$pw['g'].'" >'."\n";
			echo '<title>'.(($pw['m']==true)?'':'powiat ').$pw['n'].'</title>'."\n";
			echo '</polygon>'."\n";
			if(isset($pw['g2']))
				{
				echo '<polygon stroke-width="'.$sw.'" points="'.$pw['g2'].'" >'."\n";
				echo '<title>powiat '.$pw['n'].'</title>'."\n";
				echo '</polygon>'."\n";
				if(isset($pw['g3']))
					{
					echo '<polygon stroke-width="'.$sw.'" points="'.$pw['g3'].'" >'."\n";
					echo '<title>powiat '.$pw['n'].'</title>'."\n";
					echo '</polygon>'."\n";
					}
				}
			}
		}
	}
?>
