<?php
$v = array('v'=>'0.1');
$wojewodztwa = array(
	'zp'=>'zachodniopomorskie',
	'wp'=>'wielkopolskie',
	'wm'=>'warmińsko-mazurskie',
	'sk'=>'świętokrzyskie',
	'sl'=>'śląskie',
	'pm'=>'pomorskie',
	'pl'=>'podlaskie',
	'pk'=>'podkarpackie',
	'op'=>'opolskie',
	'mz'=>'mazowieckie',
	'mp'=>'małopolskie',
	'ld'=>'łódzkie',
	'ls'=>'lubuskie',
	'lb'=>'lubelskie',
	'kp'=>'kujawsko-pomorskie',
	'ds'=>'dolnośląskie'
	);
include 'granice.php';

function pol($sw)
	{
	$polska = array();
	global $granice;
	foreach($granice as $g)
		foreach($g['id'] as $id)
			{
			if($id=="polska") $polska[]=$g['wsp'];
			}
			
	echo '<polygon id="polska" stroke-width="'.$sw.'" points="'.implode(' ',stworzWielokat(&$polska)).'">';
	echo '<title>Polska</title>';
	echo '</polygon>';
	}
	
function woj($sw)
	{
	$w = array();
	global $granice;
	global $wojewodztwa;
	foreach($granice as $g)
		foreach($g['id'] as $id)
			{
			$w[$id][]=$g['wsp'];
			}
	
	foreach($w as $wid => $ww)
		{ 
		if($wid == "polska") continue;
		echo '<polygon id="w_'.$wid.'" stroke-width="'.$sw.'" points="'.implode(' ',stworzWielokat(&$ww)).'">';
		echo '<title>województwo '.$wojewodztwa[$wid].'</title>';
		echo '</polygon>';
		}
	
	}
?>