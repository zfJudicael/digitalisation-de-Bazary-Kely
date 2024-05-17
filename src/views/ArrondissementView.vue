<template>
    <div class="content">
        <div class="container">
            <h1>Arrondissemnet</h1>
            <div class="d-flex justify-content-end">
                <button @click="$router.push('/marche')" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
            </div>

            <table class="table table-striped table-hover mt-4">
                <thead>
                    <tr class="table-primary">
                        <th>Nom arrondissement</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr v-for="arrondissement in arrondissementStore.arrondissements">
                        <td>{{ arrondissement.nomArrond }}</td>

                        <td style="color: var(--bs-primary); font-size: 18px;">
                            <a data-bs-toggle="modal" data-bs-target="#updateArrodissement" @click="()=>{
                                selectedArrondissement = arrondissement.nomArrond
                            }">
                            <i class="bi bi-pencil-square"></i>
                        </a>
                        </td>
                        <td style="color: var(--bs-danger); font-size: 18px;">
                            <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="()=>{
                                selectedArrondissement = arrondissement.nomArrond
                            }">
                                 <i class="bi bi-trash3-fill"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th data-bs-toggle="modal" data-bs-target="#addArrodissement" colspan="3" style="cursor: pointer; color: blue; text-align: center;">
                            +Ajouter 
                        </th>
                    </tr>
                </tbody>
            </table>        
        </div>
    </div>

    <DeleteModal>
        <template v-slot:deleteCategorie>
            <div class="modal-body">
                Suppression de l'arrondissement : {{ selectedArrondissement }} 
            </div>

            <div class="mb-3">
                <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
                <button class="btn btn-danger" data-bs-dismiss="modal" @click="arrondissementStore.deleteArrondissement(selectedArrondissement)" >Supprimer</button>
            </div>
        </template>
    </DeleteModal>
    <ModificationArrondissement :nomArrond="selectedArrondissement"/>
    <AjoutArrondissement/>
</template>

<script setup>
import { useArrondissementStore } from '../stores/arrondissementStore';
import { onMounted, ref } from 'vue';
import DeleteModal from '../components/DeleteModal.vue';
import ModificationArrondissement from '../components/arrondissement/ModificationArrondissement.vue';
import AjoutArrondissement from '../components/arrondissement/AjoutArrondissement.vue';

const arrondissementStore = useArrondissementStore()

const selectedArrondissement = ref('')
onMounted(()=>{
    arrondissementStore.selectArrondissement()
})
</script>