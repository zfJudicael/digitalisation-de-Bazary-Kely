<template>
    <div class="content">
        <div class="container pb-2">
            <div class="row">
                <h1>Catégories</h1>
                <div class="col-lg-6">
                    <p class="text">
                        Tous les activités des marchands sont classés dans des catégories.<br>
                        Chaque catégorie possède chacun le taux que les marchands doivent payer tous les jours sauf le dimanche.
                    </p>
                </div> 
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3" @click="$router.push({name: 'listeActivite'})">Liste des activités</button>
                <button class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3" data-bs-toggle="modal" data-bs-target="#newCat">Nouvelle catégorie</button>
                <button class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3" @click="$router.push({name: 'listeTaux'})">Taux</button>
            </div>

            <span>Année : </span>
            <select v-model="selectedYear" id="selecteee">
                <option v-for="taux in tauxStore.annees">{{ taux.annee }}</option>
            </select>

            <div class="col-12 mt-4 table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr class="table-primary">
                        <th>Identification</th>
                        <th>Désignation</th>
                        <th>Activités</th>
                        <th>Taux</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    <tr v-for="categorie in categorieStore.categories">
                        <td>{{ categorie.idCateg }}</td>
                        <td>{{ categorie.designCateg }}</td>
                        <td>
                            <!-- <p class="DescriptionActivite" v-for="activite in activiteStore.activites.filter(activite=>{
                                 return activite.idCateg == categorie.id
                                  })">- {{ activite.codeActivite }} : {{ activite.designActivite }}
                            </p> -->

                            <p class="DescriptionActivite" v-for="activite in getActiviteByIdCateg(categorie.idCateg)">- {{ activite.codeActivite }} : {{ activite.designActivite }}
                            </p>
                            <a data-bs-toggle="modal" data-bs-target="#newActivite" @click="idCateg = categorie.idCateg">
                                <span class="badge bg-success">Ajouter</span>
                            </a> 
                        </td>

                        <td v-if="getTauxByAnneeAndIdCateg(selectedYear, categorie.idCateg).length > 0">
                            <p v-for="taux in getTauxByAnneeAndIdCateg(selectedYear, categorie.idCateg)">{{ taux.taux }} Ar</p>
                        </td>
                        <td v-else>
                            <button v-if="selectedYear != ''" class="badge bg-success" data-bs-toggle="modal" data-bs-target="#fixerTaux" @click="idCateg = categorie.idCateg">Fixer taux</button>
                        </td>

                        <td style="color: var(--bs-primary); font-size: 18px;">
                            <a data-bs-toggle="modal" data-bs-target="#updateCat" @click="()=>{
                                selectedIdCateg = categorie.idCateg
                                selectedDesignCateg = categorie.designCateg
                            }"><i class="bi bi-pencil-square"></i></a>
                        </td>
                        <td style="color: var(--bs-danger); font-size: 18px;">
                            <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="()=>{
                                selectedIdCateg = categorie.idCateg
                                activiteLength = getActiviteByIdCateg(categorie.idCateg).length
                                }"> <i class="bi bi-trash3-fill"></i> </a>
                        </td>
                    </tr>
                    </tbody>
                    
                </table>
            </div>

        </div>  
    </div>
    <NouveauCategorie/>    
    <NouveauActivite :idCateg="idCateg"/>
    <FixerTaux :idCateg="idCateg" :annee="selectedYear"/>
    <ModificationCategorie :idCateg="selectedIdCateg" :designCateg="selectedDesignCateg"/>
    <Delete>
        <template v-slot:deleteCategorie>
            <div class="modal-body">
                Suppression de la categorie : {{ selectedIdCateg }} 
            </div>

            <div class="mb-3">
                <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
                <button class="btn btn-danger" :disabled="hasCategorieGotActivites" data-bs-dismiss="modal" @click="deleteCategorie" >Supprimer</button>
            </div>
        </template>
    </Delete>
</template>

<script setup>
import NouveauCategorie from '../components/categorie/NouveauCategorie.vue';
import NouveauActivite from '../components/categorie/NouveauActivite.vue';
import FixerTaux from '../components/categorie/FixerTaux.vue';
import ModificationCategorie from '../components/categorie/ModificationCategorie.vue';
import Delete from '../components/DeleteModal.vue';
import { useCategorieStore } from '../stores/categorieStore';
import { useActiviteStore } from '../stores/activiteStore';
import { useTauxStore } from '../stores/tauxStore'
import { onMounted, watch } from 'vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const idCateg = ref('')
const categorieStore = useCategorieStore()
const activiteStore = useActiviteStore()
const tauxStore = useTauxStore()
const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear.toString())
const activiteLength = ref('')

const { getActiviteByIdCateg } = storeToRefs(activiteStore)
const { getTauxByAnneeAndIdCateg } = storeToRefs(tauxStore)

onMounted(()=>{
    tauxStore.selectAnnee()
    tauxStore.selectTaux()
    categorieStore.selectCategorie()
    activiteStore.selectActivite()
})

const selectedIdCateg = ref('')
const selectedDesignCateg = ref('')

const hasCategorieGotActivites = ref(true)
watch(activiteLength, (newVal, oldVal)=>{
    hasCategorieGotActivites.value = newVal > 0
})

const deleteCategorie = ()=>{
    if(activiteLength.value == 0){
        categorieStore.deleteCategorie(selectedIdCateg.value);
    }
}
</script>

<style scoped>
.disableBTN{
    cursor: not-allowed;
}
  .btnAnnuler{
    background-color: var(--bs-gray-300);
  }
  .btnAnnuler:hover{
    outline: 1px solid var(--bs-primary);
    color: var(--bs-primary);
  }
.badge{
    font-family: sans-serif;
}
.DescriptionActivite{
    margin-bottom: 0;
}
</style>

