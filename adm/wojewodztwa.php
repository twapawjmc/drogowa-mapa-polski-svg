<?php
header('Content-type: application/json;charset=utf-8'); 
$v = array('v'=>'0.1');
if(isset($_GET['v'])) 
	{
	echo json_encode($v); exit ;
	}
else
	{
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
	$g = array('granice'=>&$granice,'wojewodztwa'=>&$wojewodztwa);
	$g = array_merge($g,$v);
	}





echo json_encode($g); exit ;
?>