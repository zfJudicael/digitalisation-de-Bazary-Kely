<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $numContrat = $request->numContrat;
        $cinMarchand = $request->cinMarchand;
        $codeActivite = $request->codeActivite;
        $newDateContrat = $request->newDateContrat;
        $debPayement = $request->debPayement;
        $dateExpiration = $request->dateExpiration;
        $valide = $request->valide;
        $oldDateContrat = $request->oldDateContrat;


		$sql = "UPDATE contrat SET
                    cinMarchand = '".$cinMarchand."', 
                    codeActivite = '".$codeActivite."',
                    dateContrat = '".$newDateContrat."',
                    debPayement = '".$debPayement."',
                    valide = '".$valide."',
                    dateExpiration = '".$dateExpiration."' 
                WHERE 
                    numContrat = '".$numContrat."' AND dateContrat = '".$oldDateContrat."'
                ";

		if ($conn->query($sql) === TRUE) {
            $res['error']   = false;
            $res['message'] = "Modification bien effectué";
            $res['errorMessage'] = "Aucune erreur";
		} else {
            $res['message'] = "Modification non effectué";
            $res['errorMessage'] = "Error: " . $sql . "\n" . $conn->error;
		}

        $conn->close();
    }else{
        $res['message'] = "Une erreur est survenue";
    }
    
    print(json_encode($res));
?>