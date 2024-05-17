<template>
    <div class="content">
        <div class="container">
            <button @click="$router.push('/categorie')" class="btn btn-primary col-2"><i class="bi bi-backspace"></i>
                Retour
            </button>

            <div class="d-flex justify-content-end">
                <button>
                    <a data-bs-toggle="modal" data-bs-target="#initialiseTaux">
                        Nouvelle année
                    </a> 
                </button>           
            </div>

            <div class="col-12 mt-4 table-responsive"  v-for="annee in tauxStore.getAnnee">
                <p>Année : {{ annee }}</p>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th>Catégorie</th>
                            <th>Taux</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for=" taux in tauxStore.getTauxByAnnee(annee)">
                            <td>{{ taux.idCateg }}</td>
                            <td>{{ taux.taux }} Ar</td>

                            <td style="color: var(--bs-primary); font-size: 18px;">
                                <a data-bs-toggle="modal" data-bs-target="#modifTaux"
                                    @click="()=>{
                                        selectedAnnee = taux.annee
                                        selectedIdCateg = taux.idCateg
                                        selectedTaux = taux.taux
                                    }">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                            </td>
                            <!-- <td style="color: var(--bs-danger); font-size: 18px;">
                                <a data-bs-toggle="modal" data-bs-target="#deleteModale"
                                    @click="selectedCodeActivite = activite.codeActivite">
                                    <i class="bi bi-trash3-fill"></i>
                                </a>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    <!-- <DeleteModal>
        <template v-slot:deleteMarchand>
            /</!-- Modal body /-/->
            <div v-if="isResponseEmpty" class="modal-body">
                Suppression de l'activité ayant comme code : {{ selectedCodeActivite }}
            </div>

          <div v-else class="modal-body">
            <h1 class="d-flex col-12 justify-content-center p-4">
              <i class="bi bi-check-circle"></i>
            </h1>
            <h4>{{ activiteStore.error ? 'Echec de la requête' : 'Requête acceptée' }}</h4>
            <p class="text" :class="activiteStore.error ? 'fail' : 'succes'">
              {{ activiteStore.message }}
            </p>

            <button class="btn btn-success m-3" data-bs-dismiss="modal" @click="isResponseEmpty = true">Okay</button>
          </div>

          <div v-if="isResponseEmpty" class="mb-3">
            <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
            <button class="btn btn-danger" @click="deleteActivite">Supprimer</button>
          </div>
        </template>
    </DeleteModal> -->
   
    <ModificationTaux :annee="selectedAnnee" :idCateg="selectedIdCateg" :taux="selectedTaux
    "></ModificationTaux>
    <InitialiserTaux />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTauxStore } from '../../stores/tauxStore';
import { useCategorieStore } from '../../stores/categorieStore';
// import DeleteModal from '../DeleteModal.vue';

import ModificationTaux from './ModificationTaux.vue';
import InitialiserTaux from './InitialiserTaux.vue';

const tauxStore = useTauxStore()
const categorieStore = useCategorieStore()

const selectedIdCateg = ref('')
const selectedAnnee = ref('')
const selectedTaux = ref('')

onMounted(()=>{
    tauxStore.selectTaux()
    categorieStore.selectCategorie()
    tauxStore.selectAnnee()
})

const isResponseEmpty = ref(true)

const deleteActivite = ()=>{
    activiteStore.deleteActivite(selectedCodeActivite.value)

    setTimeout(()=>{
        isResponseEmpty.value = false
    },300)
}

</script>