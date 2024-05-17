<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){

        $matriculePercep = $request->matriculePercep;
        $nomPercep = $request->nomPercep;
        $prenomsPercep = $request->prenomsPercep;
        $telPercep = $request->telPercep;
        $adressePercep = $request->adressePercep;
        $codeMarche = $request->codeMarche;

        $sql = "INSERT INTO percepteur VALUES ('".$matriculePercep."', '".$nomPercep."', '".$prenomsPercep."', '".$telPercep."', '".$adressePercep."', '".$codeMarche."')";
        
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