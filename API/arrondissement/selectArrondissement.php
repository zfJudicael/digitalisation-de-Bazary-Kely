<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM arrondissement");
	$arrondissements  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($arrondissements, $row);                
	}
	$res['arrondissements']= $arrondissements;

    print(json_encode($res));
?>
   