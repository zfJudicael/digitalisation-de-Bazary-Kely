<template>
  <!-- The Modal -->
  <div class="modal fade" id="newCat">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
            Nouveau catégorie
          </h4>
        </div>

        <!-- Modal body -->
        <div class="modal-body pt-4">
          <form v-if="isResponseEmpty" @submit="saveCategorie" class=" was-validated">

            <div class="mb-3">
              <label class="form-label">Identifiant :</label>
              <input type="text" class="form-control" placeholder="Entrer l'identifiant de la catégorie" name="id" v-model="categorie.idCateg" required>
              <div class="invalid-feedback">Remplissez svp!</div>
            </div>

            <div class="mb-3">
              <label class="form-label">Désignation :</label>
              <input type="text" class="form-control" id="designCateg" placeholder="Déscription de la catégorie" name="idCateg" v-model="categorie.designCateg" required min="300">
            </div>

            <div class="div-btn mb-3">
              <input type="submit" class="btn btn-primary col-3" value="Valider">
              <button class="btn btnAnnuler me-2" data-bs-dismiss="modal" @click="cancel">Annuler</button>
            </div>
          </form>

          <div v-else id="CategResponse">
            <p :class="categorieStore.error ? 'fail' : 'succes'">{{ categorieStore.message }}</p>
            <button class="btn me-2" :class="categorieStore.error ? 'btnAnnuler' : 'btn-primary'" data-bs-dismiss="modal" @click="cancel">OK</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useCategorieStore } from '../../stores/categorieStore';

import { reactive, ref } from 'vue'

const categorie = reactive({
  idCateg: '',
  designCateg: ''
})

const isResponseEmpty = ref(true)

const categorieStore = useCategorieStore()

const saveCategorie = (event)=>{
  event.preventDefault()
  categorieStore.addCategorie(categorie.idCateg.toUpperCase(), categorie.designCateg)

  setTimeout(()=>{
    isResponseEmpty.value = false
  }, 300)
}

function cancel(){
  isResponseEmpty.value = true
  categorie.idCateg = ''
  categorie.designCateg = ''
}

</script>

<style scoped>
#CategResponse{
  text-align: center;
}
.succes{
  color: greenyellow;
}

.fail{
  color: red;
}
.modal-header {
  background-color: var(--bs-primary);
  color: white;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.btnAnnuler {
  background-color: var(--bs-gray-300);
}

.btnAnnuler:hover {
  outline: 1px solid var(--bs-danger);
  color: var(--bs-danger);
}

.div-btn {
  text-align: center;
}
</style>