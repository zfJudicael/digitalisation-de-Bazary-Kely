<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT DISTINCT annee FROM taux");
	$annees  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($annees, $row);                
	}
	$res['annees']= $annees;

    print(json_encode($res));
?>
   