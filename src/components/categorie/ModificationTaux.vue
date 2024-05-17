<template>
    <!-- The Modal -->
    <div class="modal fade" id="modifTaux">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
  
          <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
             Modification taux
          </h4>
        </div>
        <div class="modal-body pt-4">
          <form class="was-validated" @submit="saveChange">
                <div class="mb-3">
                  <label class="form-label">Année :</label>
                  <input id="anneeTauxModif" :value="props.annee" type="text" class="form-control" readonly required>
                  <!-- <div class="invalid-feedback">Remplissez le nom de la catégorie svp!</div> -->
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Catégorie :</label>
                  <input id="idCategTauxModif" :value="props.idCateg" type="text" class="form-control" readonly required>
                  <!-- <div class="invalid-feedback">Remplissez le prix du ticket journalier</div> -->
                </div>

                <div class="mb-3">
                  <label class="form-label">Taux actuel :</label>
                  <input id="oldTaux" :value="`${props.taux} Ar`" type="text" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <label class="form-label">Nouveau taux : </label>
                  <input id="newTaux" :value="props.taux" type="text" class="form-control" min="100" placeholder="En Ariary" required>
                </div>

                <div class="div-btn mb-3">
                  <input type="submit" class="btn btn-primary col-3" data-bs-dismiss="modal" value="Valider">
                  <button class="btn btnAnnuler me-2" data-bs-dismiss="modal" @click="(event)=>{
                    event.preventDefault()
                    }">Annuler</button>
                </div>  
          </form>
        </div>
        </div>
      </div>
        
    </div>
  </template>
  
  <script setup>
  import { useTauxStore } from '../../stores/tauxStore';

  const tauxStore = useTauxStore()
  const props = defineProps({
    annee: String,
    idCateg: String,
    taux: String
  })

  const saveChange = (event)=>{
    event.preventDefault()
    var newTaux = document.getElementById('newTaux').value

    tauxStore.updateTaux(props.annee, props.idCateg, newTaux)
  }
  </script>
  
  <style scoped>
  .modal-dialog{
    position: relative;
  }
  .modal-header{
    background-color: var(--bs-primary);
    color: white;
  }
  
  .btn-close{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  </style>