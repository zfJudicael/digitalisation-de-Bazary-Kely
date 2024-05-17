<template>
    <div class="content">
        <div class="container">
            <button @click="$router.push('/categorie')" class="btn btn-primary col-2"><i class="bi bi-backspace"></i>
                Retour
            </button>

            <div class="col-12 mt-4 table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th>Code de l'activité</th>
                            <th>Déscription</th>
                            <th>Catégorie</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for=" activite in activiteStore.activites">
                            <td>{{ activite.codeActivite }}</td>
                            <td>{{ activite.designActivite }}</td>
                            <td>{{ activite.idCateg }}</td>

                            <td style="color: var(--bs-primary); font-size: 18px;">
                                <a data-bs-toggle="modal" data-bs-target="#modifActivite"
                                    @click="()=>{
                                        selectedCodeActivite = activite.codeActivite
                                        selectedDesignActivite = activite.designActivite
                                        selectedIdCateg = activite.idCateg
                                    }">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                            </td>
                            <td style="color: var(--bs-danger); font-size: 18px;">
                                <a data-bs-toggle="modal" data-bs-target="#deleteModale"
                                    @click="selectedCodeActivite = activite.codeActivite">
                                    <i class="bi bi-trash3-fill"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    <DeleteModal>
        <template v-slot:deleteMarchand>
            <!-- Modal body -->
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
    </DeleteModal>
    <ModificationActivite :codeActivite="selectedCodeActivite" :designActivite="selectedDesignActivite" :idCateg="selectedIdCateg" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useActiviteStore } from '../../stores/activiteStore';
import { useCategorieStore } from '../../stores/categorieStore';
import DeleteModal from '../DeleteModal.vue';
import ModificationActivite from './ModificationActivite.vue';

const activiteStore = useActiviteStore()
const categorieStore = useCategorieStore()

onMounted(()=>{
    activiteStore.selectActivite()
    categorieStore.selectCategorie()
})

const selectedCodeActivite = ref('')
const selectedDesignActivite = ref('')
const selectedIdCateg = ref('')
const isResponseEmpty = ref(true)

const deleteActivite = ()=>{
    activiteStore.deleteActivite(selectedCodeActivite.value)

    setTimeout(()=>{
        isResponseEmpty.value = false
    },300)
}

</script>