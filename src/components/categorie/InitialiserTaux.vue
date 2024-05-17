<template>
<!-- The Modal -->
<div class="modal fade" id="initialiseTaux">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="d-flex col-12 justify-content-center">Nouvelle année</h4>
            </div>
  
            <!-- Modal body -->
            <div class="modal-body pt-4">
                <form @submit="saveTaux" class="was-validated">
                    <div class="mb-3">
                        <label for="anneeTaux" class="form-label">Année :</label>
                        <input type="number" v-model="annee" class="form-control" id="anneeTaux" min="1900" required>
                        <div class="invalid-feedback">Remplissez correctement svp!</div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Les catégories :</label>
                        <div  v-for="categorie in categorieStore.categories" class="mb-3 d-flex">
                            <input type="text" :value="categorie.idCateg" readonly>
                            <input type="number" min="100" class="form-control CategRenouv" placeholder="Taux en Ariary" required>
                        </div>
                    </div>
                    
                    <p v-show="isYearsAlreadyExisted" class="error">L'année que vous entrez existe déjà</p>
                    
                    <div class="div-btn mb-3">
                        <input type="submit" class="btn btn-primary col-3" value="Valider" :disabled="isYearsAlreadyExisted">
                        <input type="button" class="btn btnAnnuler me-2" data-bs-dismiss="modal" value="Annuler">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTauxStore } from '../../stores/tauxStore';
import { useCategorieStore } from '../../stores/categorieStore';

const tauxStore = useTauxStore()
const categorieStore = useCategorieStore()

onMounted(()=>{
    categorieStore.selectCategorie()
    tauxStore.selectTaux()
})


const annee = ref('')
const saveTaux = (event)=>{
    event.preventDefault()
    var CategRenouv = document.getElementsByClassName('CategRenouv')
    for(let i = 0; i<categorieStore.categories.length; i++){
        tauxStore.addTaux(annee.value, categorieStore.categories[i].idCateg, CategRenouv[i].value)
    }    
}

const isYearsAlreadyExisted = ref(false)

watch(annee, (newAnnee, oldAnnee)=>{
    isYearsAlreadyExisted.value = tauxStore.getAnnee.includes(newAnnee.toString())
})
</script>

<style>
.error {
    color: red;
}
</style>