<?php
	require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));
	$contrats = [];
	if($request != null){
		$matriPercep = $request->matriPercep;
		$dateFormat = '%d/%m/%Y';

		$result = $conn->query("SELECT 
			numContrat,
			cinMarchand,
			numPlace,
			codeActivite,
			annee,
			DATE_FORMAT(debPayement, '".$dateFormat."') AS debPayement,
			DATE_FORMAT(dateContrat, '".$dateFormat."') AS dateContrat,
			DATE_FORMAT(dernierPayement, '".$dateFormat."') AS dernierPayement
		 FROM contrat WHERE numPlace IN (SELECT numPlace FROM occuper WHERE dateFin IS NULL AND matriPercep = '".$matriPercep."') ");
		$contrats  = array();
		while ($row = $result->fetch_assoc()) {
			array_push($contrats, $row);                
		}
	}
	
	$res['contrats']= $contrats;

    print(json_encode($res));
?>
   