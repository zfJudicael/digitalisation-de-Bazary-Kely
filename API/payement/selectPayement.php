<?php
  require "../connectDb.php";

  $request = json_decode(file_get_contents("php://input"));
  $payements = array();

  if($request == null){
    // Aucun paramètre 
    
    $result = $conn->query("SELECT
                              contrat.numPlace AS numPlace,
                              marchand.nom AS nom,
                              marchand.prenom AS prenom,
                              place.lotPlace AS lot,
                              percepteur.matriculePercep AS percepteur,
                              activite.designActivite AS activite,
                              taux.taux,
                              MAX(payement.datePaye) AS dernierPayement,
                              contrat.debutPayement AS debutPayement
                          FROM
                              contrat
                          LEFT JOIN payement ON contrat.numPlace = payement.numPlace
                          INNER JOIN marchand ON contrat.cinMarchand = marchand.cin
                          INNER JOIN place ON contrat.numPlace = place.numPlace
                          INNER JOIN percepteur ON occuper.matriPercep = percepteur.matriculePercep
                          INNER JOIN activite ON contrat.codeActivite = activite.codeActivite
                          -- INNER JOIN categorie ON activite.idCateg = categorie.idCateg
                          -- INNER JOIN taux ON categorie.idCateg = taux.idCateg AND contrat.annee = taux.annee
                          -- WHERE  (contrat.numPlace, contrat.annee) IN(
                                    -- SELECT
                                        -- contrat.numPlace,
                                        -- MAX(contrat.annee) AS MAX
                                    -- FROM
                                        -- contrat
                                    -- GROUP BY
                                        -- contrat.numPlace
                                  -- )
                          -- GROUP BY
                              -- contrat.numPlace
                          -- ORDER BY dernierPayement DESC
                          LIMIT 50");
    
    while ($row = $result->fetch_assoc()) {
      array_push($payements, $row);
    }
  }
  else{
    if($request->numPlace){
      // Recherche par le numéro de place
    }
    if($request->nom_prenom){
      // Recherche par nom et prénoms
    }
    if($request->lot){
      // Recherche par lot de place
    }
    if($request->percepteur){
      // Recherche par le numéro de percepteur
    }
  }

  $conn->close();
  
  $res['payements'] = $payements;

  print(json_encode($res));

?>