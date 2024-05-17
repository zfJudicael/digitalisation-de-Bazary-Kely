<?php
    require "../connectDb.php";
    $request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $oldCin = $request->oldCin;
        $newCin = $request->newCin;
        $nom = $request->nom;
		$prenoms = $request->prenoms;
        $datenaiss = $request->datenaiss;
        $lieunaiss = $request->lieunaiss;
        $datedelivr = $request->datedelivr;
        $lieudelivr = $request->lieudelivr;
        $tel = $request->tel;
        $adresse = $request->adresse;

		$sql = "UPDATE marchand SET cin = '".$newCin."', nom = '".$nom."', prenom = '".$prenoms."',datenaiss = '".$datenaiss."', lieunaiss = '".$lieunaiss."', datedelivr = '".$datedelivr."', lieudelivr = '".$lieudelivr."', tel = '".$tel."', adresse = '".$adresse."'  WHERE cin = ".$oldCin." ";

		if ($conn->query($sql) === TRUE) {
            $res['error']   = false;
            $res['message'] = "Modification bien effectuée";
            $res['errorMessage'] = "Aucune erreur";
		} else {
            $res['message'] = "MOdification non effectuée";
            $res['errorMessage'] = "Error: " . $sql . "\n" . $conn->error;
		}

        $conn->close();
    }else{
        $res['message'] = "Une erreur est survenue";
    }
    
    print(json_encode($res));
?>