<?php
	require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));
	$contrats = array();
    $dateContrat = null;
	if($request != null){
		$numContrat = $request->numContrat;
        $dateContrat = $request->dateContrat;
        $dateFormat = '%d/%m/%Y';

		$result = $conn->query("SELECT * FROM contrat 
            WHERE numContrat = '".$numContrat."'
            AND DATE_FORMAT(dateContrat, '".$dateFormat."')= '".$dateContrat."' ");
		while ($row = $result->fetch_assoc()) {
			array_push($contrats, $row);                
		}
	}
	
	$res['contrats']= $contrats;
    $res['dateContrat'] = $dateContrat;

    print(json_encode($res));
?>
   