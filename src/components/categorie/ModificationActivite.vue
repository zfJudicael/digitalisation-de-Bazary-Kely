<template>
    <!-- The Modal -->
    <div class="modal fade" id="modifActivite">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
  
          <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
             Modification d'activité
          </h4>
        </div>
        <div class="modal-body pt-4">
          <form class="was-validated">
                <div class="mb-3">
                  <label class="form-label">Code activite:</label>
                  <input id="codeActiviteModif" :value="props.codeActivite" type="text" class="form-control" required>
                  <!-- <div class="invalid-feedback">Remplissez le nom de la catégorie svp!</div> -->
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Déscription :</label>
                  <input id="designActiviteModif" :value="props.designActivite" type="text" class="form-control" placeholder="Déscription de l'activité"  required>
                  <div class="invalid-feedback">Remplissez le prix du ticket journalier</div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Actuelle catégorie :</label>
                  <input id="oldIdCateg" :value="props.idCateg" type="text" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <label class="form-label">Nouvelle catégorie : </label>
                  <select id="newIdCateg" :value="props.idCateg">
                    <option v-for="categorie in categorieStore.categories">{{ categorie.idCateg }}</option>
                  </select>
                </div>

                <div class="div-btn mb-3">
                  <input type="submit" class="btn btn-primary col-3" data-bs-dismiss="modal" value="Valider" @click="saveChange">
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
  import { useCategorieStore } from '../../stores/categorieStore';
  import { useActiviteStore } from '../../stores/activiteStore';

  const categorieStore = useCategorieStore()
  const activiteStore = useActiviteStore()
  const props = defineProps({
    codeActivite: String,
    designActivite: String,
    idCateg: String
  })

  const saveChange = (event)=>{
    event.preventDefault()
    var codeActiviteModif = document.getElementById('codeActiviteModif').value
    var designActiviteModif = document.getElementById('designActiviteModif').value
    var newIdCateg = document.getElementById('newIdCateg').value

    activiteStore.updateActivite(props.codeActivite, codeActiviteModif.toUpperCase(), designActiviteModif, newIdCateg )
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