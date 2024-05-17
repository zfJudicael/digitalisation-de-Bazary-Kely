<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM occuper WHERE dateFin is NULL");
	$placeOccupe  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($placeOccupe, $row);                
	}
	$res['placeOccupe']= $placeOccupe;

    print(json_encode($res));
?>
   