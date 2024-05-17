<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $numPlace = $request->numPlace;
        $lotPlace = $request->lotPlace;
        $codeMarche = $request->codeMarche;
        $matriculePercep = $request->matriculePercep;

        if($numPlace === ''){
            $sql = "INSERT INTO place(lotPlace, codeMarche) VALUES ('".$lotPlace."', '".$codeMarche."')";
        }else{
            $sql = "INSERT INTO place VALUES (".$numPlace.", '".$lotPlace."', '".$codeMarche."')";
        }
		

		if ($conn->query($sql) === TRUE) {
            $sql1 = "INSERT INTO occuper(matriPercep, numPlace)
                     SELECT '".$matriculePercep."', numPlace from place WHERE lotPlace = '".$lotPlace."' ";
            $conn->query($sql1);
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