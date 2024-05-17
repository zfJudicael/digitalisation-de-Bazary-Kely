<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $numContrat = $request->numContrat;
        $cinMarchand = $request->cinMarchand;
        $nomMarche = $request->nomMarche;
        $numPlace = $request->numPlace;
        $codeActivite = $request->codeActivite;
        $annee = $request->annee;
        $debPayement = $request->debPayement;
        $dateContrat = $request->dateContrat;
        $dateExpiration = $request->dateExpiration;

		$sql = "INSERT INTO contrat(numContrat, cinMarchand, numPlace, codeActivite, annee, debPayement, dateContrat, dateExpiration)
                 VALUES ('".$numContrat."', '".$cinMarchand."', '".$numPlace."', '".$codeActivite."', '".$annee."', '".$debPayement."', '".$dateContrat."', '".$dateExpiration."')";

		if ($conn->query($sql) === TRUE) {
            $res['error']   = false;
            $res['message'] = "Ajout bien effectué";
            $res['errorMessage'] = "Aucune erreur";
		} else {
            $res['message'] = "Ajout non effectué";
            $res['errorMessage'] = "Error: " . $sql . "\n" . $conn->error;
		}

        $conn->close();
    }else{
        $res['message'] = "Une erreur est survenue";
    }
    
    print(json_encode($res));
?>