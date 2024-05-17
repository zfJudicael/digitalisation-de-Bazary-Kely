<?php
    require "../connectDb.php";

	$request = json_decode(file_get_contents("php://input"));

    $res['error'] = true;

    if($request != null){
        
        $values = $request->values;
        $derniereDatePaye = $request->derniereDatePaye;
        $numContrat = $request->numContrat;
        $dateContrat = $request->dateContrat;
        // $dateFormat = '%d/%m/%Y';
        

		$sql = "INSERT INTO payement (numTicket, numPlace, datePaye, datePayement, dateContrat) 
        VALUES ".$values." ";
        $res['sql'] = $sql;

		if ($conn->query($sql) === TRUE) {
            $sql1 = "UPDATE contrat SET dernierPayement = '".$derniereDatePaye."' WHERE numContrat = '".$numContrat."' 
                AND dateContrat = '".$dateContrat."' ";
            $res['sql1'] = $sql1;
            $conn->query($sql1);

            $res['error']   = false; 
            $res['message'] = "Payement bien effectué";
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