<template>
  <!-- The Modal -->
  <div class="modal fade" id="updateCat">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
             Modification de catégorie
          </h4>
        </div>
                    
        <!-- Modal body -->
        <div v-if="isResponseEmpty" class="modal-body pt-4">
          <form class="was-validated Categated">
                <div class="mb-3">
                  <label class="form-label">Identifiant :</label>
                  <input :value="props.idCateg" type="text" class="form-control" id="idCategModif" placeholder="Entrer le nom de la catégorie"  required>
                  <div class="invalidCateg-feedback">Remplissez le nom de la catégorie svp!</div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Déscription :</label>
                  <input :value="props.designCateg" type="text" class="form-control" id="designCategModif" placeholder="Déscription"  required>
                  <div class="invalidCateg-feedback">Remplissez la déscription de la catégorie svp!</div>
                </div>
  
                <!-- <div class="mb-3">
                  <label for="designCateg" class="form-label">designCateg:</label>
                  <input :value="props.designCateg" type="number" class="form-control" id="designCategCategModif" placeholder="En Ariary(Ar)" name="designCateg" required min="300">
                  <div class="invalidCateg-feedback">Remplissez le prix du ticket journalier</div>
                </div> -->

                <div class="div-btn mb-3">
                  <input type="submit" class="btn btn-primary col-3" value="Valider" @click="saveChange">
                  <button class="btn btnAnnuler me-2" data-bs-dismiss="modal" @click="(event)=>{
                    event.preventDefault()
                    isResponseEmpty = true
                    }">Annuler</button>
                </div>  
          </form>
        </div>

        <div v-else id="ModifCategResponse">
            <p :class="categorieStore.error ? 'fail' : 'succes'">{{ categorieStore.message }}</p>
            <button class="btn me-2" :class="categorieStore.error ? 'btnAnnuler' : 'btn-primary'" data-bs-dismiss="modal" @click="isResponseEmpty = true">OK</button>
          </div>
      
      </div>
    </div>
      
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCategorieStore } from '../../stores/categorieStore';
import { useActiviteStore } from '../../stores/activiteStore';

const categorieStore = useCategorieStore()
const activiteStore = useActiviteStore()

const props = defineProps({
  idCateg: String,
  designCateg: String
})

const isResponseEmpty = ref(true)

const saveChange = (event)=>{
  event.preventDefault()
  let newIdCateg = document.getElementById('idCategModif').value
  let designCateg = document.getElementById('designCategModif').value

  categorieStore.updateCategorie(props.idCateg, newIdCateg.toUpperCase(), designCateg)
  
  setTimeout(()=>{
    isResponseEmpty.value = false
    activiteStore.selectActivite()
  }, 300)
}

</script>

<style scoped>
#ModifCategResponse{
  text-align: center;
}
.succes{
  color: green;
}

.fail{
  color: red;
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

.btnAnnuler{
  background-color: var(--bs-gray-300);
}
.btnAnnuler:hover{
  outline: 1px solidCateg var(--bs-danger);
  color: var(--bs-danger);
}
.div-btn{
  text-align: center;
}
</style>