<template>
  <!-- The Modal -->
  <div class="modal fade" id="fixerTaux">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
             Taux pour l'année : {{ props.annee }}
          </h4>
        </div>
                    
        <!-- Modal body -->
        <div class="modal-body pt-4">
          <form @submit="saveTaux" class="was-validated">

            <div class="mb-3">
              <label class="form-label">Catégorie :</label>
              <input type="text" class="form-control" id="categorieADD" name="categorie" :value="props.idCateg" readonly>
            </div>

            <div class="mb-3">
              <label for="nouvTaux" class="form-label">Montant en Ariary :</label>
              <input v-model="nouvTaux" type="number" min="100" class="form-control" id="nouvTaux" name="code" required>
            </div>
                
            <div class="div-btn mb-3">
              <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
              <input :disabled="nouvTaux.length == 0" type="submit" data-bs-dismiss="modal" class="btn btn-primary col-3" value="Valider">
            </div> 
          </form>
        </div>       
      </div>
    </div>
    
      
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTauxStore } from '../../stores/tauxStore';


const tauxStore = useTauxStore()

const props = defineProps({
  idCateg: String,
  annee: String
})

const nouvTaux = ref('')

const saveTaux = (event)=>{
  event.preventDefault()
  tauxStore.addTaux(props.annee, props.idCateg, nouvTaux.value)
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