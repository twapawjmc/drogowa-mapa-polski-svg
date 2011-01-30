<?php
function stworzWielokat($tt, $id=null, $t=null) 
	//funkcja tworzy wielokąt łącząc podane w tablicy ocinki takimi samymi końcami.
	{
	$dbg=0; //tryb debugowania
	$polygon; //zawiera dane do wydrukowania
	$p; //tablica zawierająca współrzędne tworzonego wielokąta
	$l; //liczba odcinków do połączenia
	
	//utworzenie tagu "polygon" i przypisanie identyfikatora podanego jako drugi argument funkcji
	$polygon = '<polygon ';
	if($id!=null) $polygon .= 'id="'.$id.'" ';
	$polygon .= 'points="';
	
	//rozbicie współrzędnych pierwszego odcinka i dodanie ich do naszego wielokąta
	$p = explode(" ",$tt[0]);

	//pobieramy liczbę odcinków
	$l = sizeof($tt);
	if($dbg) echo "\n".'['.'l='.$l.']'."\n";
	
	//gdy mamy więcej odcinków niż 1 to należy je dołączyć
	if($l > 1)
		{
		for($i=1;$i<$l;$i++)
			{
			if($dbg) echo "\n".'['.'i='.$i.']'."\n";
			
			//pobieramy liczbę współrzędnych z których składa się dotychczas utworzony wielokąt
			$liczbaWsp = sizeof($p);
			
			//if($dbg) var_dump($p);
			if($dbg) echo '[liczbaWsp='.$liczbaWsp.']';
			
			//współrzędne pierwszego punktu wielokąta
			$pPkt = $p[0];
			
			if($dbg) echo '[pPkt='.$pPkt.']';
			
			//współrzędne ostatniego punktu wielokąta
			$ostPkt = $p[$liczbaWsp-1];
			
			if($dbg) echo '[ostPkt='.$ostPkt.']';
			if($dbg) echo "\n".'['.$pPkt.','.$p[1].'...'.$p[$liczbaWsp-2].','.$ostPkt.']'."\n";
			
			//przebiegamy przez wszystkie pozostałe odcinki
			for($j=1;$j<$l;$j++)
				{
				if($dbg) echo "\n"."\t".'['.'j='.$j.']'."\n";
				
				//jeśli odcinek był już użyty to go pomijamy
				if($tt[$j] == null) continue;
				
				//pobieramy współrzędne j-tego odcinka
				$aktGran2 = trim($tt[$j]);
				
				//kopiujemy współrzędne odcinka to tablicy
				$wspAktGran2 = explode(" ",$aktGran2);
				
				//pobieramy liczbę współrzędnych odcinka
				$liczbaWsp2 = sizeof($wspAktGran2);
				
				if($dbg) echo "\n"."\t".'['.'liczbaWsp2='.$liczbaWsp2.']'."\n";
				
				//pobierammy współrzędne pierwszego punktu odcinka
				$pPkt2 = $wspAktGran2[0];
				
				if($dbg) echo "\n"."\t".'['.'pPkt2='.$pPkt2.']'."\n";
				
				//pobierammy współrzędne ostatniego punktu odcinka
				$ostPkt2 = $wspAktGran2[$liczbaWsp2-1];
				
				if($dbg) echo "\n"."\t".'['.'ostPkt2='.$ostPkt2.']'."\n";
				if($dbg) echo "\n"."\t".'['.$pPkt2.','.$wspAktGran2[1].'...'.$wspAktGran2[$liczbaWsp2-2].','.$ostPkt2.']'."\n";
				
				//sprawdzamy czy ostatni punkt wielokąta pasuje do pierwszego punktu odcinka
				if(strcmp($ostPkt,$pPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(1)'.$ostPkt.'|'.$pPkt2.']'."\n";
					
					//usuwamy duplikującą się współrzędną
					unset($wspAktGran2[0]);
					
					//dołączamy odcinek do wielokątu
					$p = array_merge($p, $wspAktGran2);
					
					//usuwamy użyty odcinek
					$tt[$j] = null;
					break;
					}
				//sprawdzamy czy pierwszy punkt wielokąta pasuje do ostatniego punktu odcinka
				elseif(strcmp($pPkt,$ostPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(2)'.$pPkt.'|'.$ostPkt2.']'."\n";
					
					//usuwamy duplikującą się współrzędną
					unset($p[0]);
					
					//dołączamy odcinek do wielokątu
					$p = array_merge($wspAktGran2,$p);
					
					//usuwamy użyty odcinek
					$tt[$j] = null;
					break;
					}
				//sprawdzamy czy ostatni punkt wielokąta pasuje do ostatniego punktu odcinka
				elseif(strcmp($ostPkt,$ostPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(3)'.$ostPkt.'|'.$ostPkt2.']'."\n";
					
					//odwracamy odcinek
					$wspAktGran2 = odwrocTablice($wspAktGran2);
					
					//usuwamy duplikującą się współrzędną
					unset($wspAktGran2[0]);
					
					//dołączamy odcinek do wielokątu
					$p = array_merge($p, $wspAktGran2);
					
					//usuwamy użyty odcinek
					$tt[$j] = null;
					break;
					}
				//sprawdzamy czy pierwszy punkt wielokąta pasuje do pierwszego punktu odcinka
				elseif(strcmp($pPkt,$pPkt2) == 0)
					{
					if($dbg) echo "\n"."\t".'[(4)'.$pPkt.'|'.$pPkt2.']'."\n";
					
					//odwracamy odcinek
					$wspAktGran2 = odwrocTablice($wspAktGran2);
					
					//usuwamy duplikującą się współrzędną
					unset($p[0]);
					
					//dołączamy odcinek do wielokątu
					$p = array_merge($wspAktGran2,$p);
					
					//usuwamy użyty odcinek
					$tt[$j] = null;
					break;
					}
				}
			//sprawdzamy czy ostatni punkt wielokąta jest taki sam jak pierwszy
			if(strcmp($pPkt,$ostPkt) == 0)
				{
				//jeśli tak to usuwamy jeden z nich(pierwszy)
				unset($p[0]);
				//skoro ostani punkt jest taki sam jak pierwszy to znaczy, że wielokąt jest już utworzony
				break;
				}
			}
		if($dbg) echo "\n"."\n";
		}
	//dołączenie współrzędnych
	$polygon .= implode(' ',$p);
	if($t==null) $polygon .='"/>'."\r\n";
	else
		{
		$polygon .= '">'."\r\n";
		$polygon .= '<title>'.$t.'</title>'."\r\n";
		$polygon .='</polygon>'."\r\n";
		}
	
	//wydrukowanie wielokątu
	echo $polygon;
	}
	


function odwrocTablice($a)
	//funkcja odwraca kolejność tablicy
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
	//powoduje przerwę w wykonywaniu skryptów, a tym samym pozwala pokazać kolejność ładowania się elementów strony
	{
	for($i=0;$i<10000000;$i++);
	}
	
function d($a)
	{
	echo '<pre>';
	var_dump($a);
	echo '</pre>';
	}
?>