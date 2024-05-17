<?php
	require "../connectDb.php";

	$result = $conn->query("SELECT * FROM taux ORDER BY annee DESC");
	$taux  = array();
	while ($row = $result->fetch_assoc()) {
		array_push($taux, $row);                
	}
	$res['taux']= $taux;

    print(json_encode($res));
?>
   