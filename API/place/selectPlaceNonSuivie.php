<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * from place WHERE numPlace NOT IN (SELECT numPlace FROM occuper WHERE dateFin IS NULL);");
	$places  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($places, $row);                
	}
	$res['places']= $places;

    print(json_encode($res));
?>
   