<template>
  <!-- The Modal -->
  <div class="modal fade" id="newActivite">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
             Nouvelle Activité
          </h4>
        </div>
                    
        <!-- Modal body -->
        <div class="modal-body pt-4">
          <form @submit="saveActivite" class="was-validated">
                <div class="mb-3">
                  <label for="code" class="form-label">Code :</label>
                  <input v-model="activite.codeActivite" type="text" class="form-control" id="code" placeholder="Entrer le code de l'activité" name="code" required>
                  <div class="invalid-feedback">Remplissez le code de la catégorie svp!</div>
                </div>

                <div class="mb-3">
                  <label for="designActivite" class="form-label">Déscription :</label>
                  <input v-model="activite.designActivite" type="text" class="form-control" id="designActivite" name="categorie" required>
                  <div class="invalid-feedback">Veuillez remplir la déscription</div>
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Catégorie :</label>
                  <input type="text" class="form-control" id="categorieADD" name="categorie" :value="props.idCateg" readonly>
                </div>
                
            <div class="div-btn mb-3">
              <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
              <input type="submit" class="btn btn-primary col-3" value="Valider">
            </div> 
          </form>
        </div>       
      </div>
    </div>
    
      
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useActiviteStore } from '../../stores/activiteStore';

const activiteStore = useActiviteStore()

const props = defineProps({
  idCateg: String
})

const activite = reactive({
  codeActivite: '',
  designActivite: ''
})
const saveActivite = (event)=>{
  event.preventDefault()
  const idCateg = document.getElementById('categorieADD').value
  activiteStore.addActivite(activite.codeActivite.toUpperCase(), activite.designActivite, idCateg)
}

</script>

<style scoped>

.modal-header{
  background-color: var(--bs-primary);
  color: white;
}

.btn-close{
  position: absolute;
  top: 10px;
  right: 10px;
}

.btnAnnuler{
  background-color: var(--bs-gray-300);
}
.btnAnnuler:hover{
  outline: 1px solid var(--bs-danger);
  color: var(--bs-danger);
}
.div-btn{
  text-align: center;
}
</style>