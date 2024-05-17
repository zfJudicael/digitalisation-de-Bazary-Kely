<?php

  require "../connectDb.php";

  $request = json_decode(file_get_contents("php://input"));
  $recettes = array();
  $res['error'] = true;

  if($request != null){
    $dateDeb = $request->dateDeb;
    $dateFin = $request->dateFin;

    $result =  $conn->query("
        SELECT
              contrat.numPlace AS numPlace,
              contrat.dateContrat AS dateContrat,
              contrat.debPayement AS debutPayement,
              marchand.nom AS nomMarchand,
              marchand.prenom AS prenomMarchand,
              COUNT(payement.numTicket) AS nombreJourPaye,
              place.codeMarche AS codeMarche,
              place.lotPlace AS lot,
              marche.nomMarche AS nomMarche,
              occuper.matriPercep AS codePercepteur,
              percepteur.nomPercep AS nomPercepteur,
              percepteur.prenomsPercep AS prenomsPrecepteur,
              contrat.codeActivite AS activite,
              contrat.annee AS annee,
              contrat.dateExpiration As dateExpiration,
              activite.idCateg AS categorie,
              taux.taux AS taux,
              contrat.valide AS valide
        FROM
              contrat
          LEFT JOIN payement
                    ON contrat.numPlace = payement.numPlace AND payement.dateContrat = contrat.dateContrat 
                    AND payement.datePaye BETWEEN '".$dateDeb."' AND '".$dateFin."'
          JOIN place ON contrat.numPlace = place.numPlace
          JOIN occuper ON place.numPlace = occuper.numPlace
          JOIN percepteur ON occuper.matriPercep = percepteur.matriculePercep
          JOIN marche ON place.codeMarche = marche.codeMarche
          JOIN marchand ON contrat.cinMarchand = marchand.cin
          JOIN activite ON contrat.codeActivite = activite.codeActivite
          JOIN taux ON contrat.annee = taux.annee AND activite.idCateg = taux.idCateg
        WHERE
              occuper.dateFin is NULL 
        AND
              (contrat.numPlace, contrat.annee) IN
                  (
                    SELECT
                    contrat.numPlace,
                    annee
                    FROM
                      contrat
                    GROUP BY
                      contrat.numPlace
                  )
        GROUP BY contrat.numPlace, contrat.dateContrat 
        ORDER BY place.codeMarche, occuper.matriPercep, contrat.numPlace ASC"); 
      while ($row = $result->fetch_assoc()) {
        array_push($recettes, $row);
      }
      $res['error']   = false; 
      $res['message'] = "chargement bien effectué";
      $res['errorMessage'] = "Aucune erreur";

  }
    
  
  $conn->close();
  $res['recettes'] = $recettes;

  print(json_encode($res));

?>