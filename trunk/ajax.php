<?php
header('Content-type: application/json;charset=utf-8'); 

if(isset($_GET['granice']))
	{
	include 'adm/wojewodztwa.php';
	if(isset($_GET['v'])) 
		{
		echo json_encode($v); exit ;
		}
	else 
		{
		$g = array('granice'=>&$granice,'wojewodztwa'=>&$wojewodztwa);
		$g = array_merge($g,$v);
		}
	}




echo json_encode($g); exit ;
?>