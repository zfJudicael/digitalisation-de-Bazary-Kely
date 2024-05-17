<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $cin = $request->cin;
        $nom = $request->nom;
		$prenoms = $request->prenoms;
        $datenaiss = $request->datenaiss;
        $lieunaiss = $request->lieunaiss;
        $datedelivr = $request->datedelivr;
        $lieudelivr = $request->lieudelivr;
        $tel = $request->tel;
        $adresse = $request->adresse;

		$sql = "INSERT INTO marchand (cin, nom, prenom, datenaiss, lieunaiss, datedelivr, lieudelivr, tel, adresse) 
        VALUES ('".$cin."', '".$nom."', '".$prenoms."', '".$datenaiss."', '".$lieunaiss."', '".$datedelivr."', '".$lieudelivr."', '".$tel."', '".$adresse."')";

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