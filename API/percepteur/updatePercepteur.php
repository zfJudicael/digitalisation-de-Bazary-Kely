<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){

        $oldMatriculePercep = $request->oldMatriculePercep;
        $newMatriculePercep = $request->newMatriculePercep;
        $nomPercep = $request->nomPercep;
        $prenomsPercep = $request->prenomsPercep;
        $telPercep = $request->telPercep;
        $adressePercep = $request->adressePercep;
        $codeMarche = $request->codeMarche;

        $sql = "UPDATE percepteur SET matriculePercep = '".$newMatriculePercep."', nomPercep = '".$nomPercep."', prenomsPercep = '".$prenomsPercep."', telPercep = '".$telPercep."', adressePercep = '".$adressePercep."' WHERE matriculePercep = '".$oldMatriculePercep."' ";
        
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