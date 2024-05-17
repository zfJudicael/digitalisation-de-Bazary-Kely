<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM place WHERE numPlace NOT IN ( SELECT numPlace from contrat WHERE valide is TRUE) ");
	$places  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($places, $row);                
	}
	$res['places']= $places;

    print(json_encode($res));
?>
   