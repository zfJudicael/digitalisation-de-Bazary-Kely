<template>
    <div class="content">
        <div class="container">
            <h1>Contrat</h1>
            <div class="col-lg-6">
                <p class="text">
                    Le contrat est un engagement que le marchand établit à la Commune Urbaine de Toamasina, il definit
                    l'activité
                    commerciale d'une place durant douze (12) mois renouvellable.
                </p>
            </div>

            <span class="form-label me-4">Année : </span>
            <select v-model="selectedYear" id="selecteee">
                <option v-for="taux in tauxStore.annees">{{ taux.annee }}</option>
            </select>

            <div class="d-flex justify-content-end mb-4">
                <button class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3"
                    @click="$router.push({ name: 'nouveauContrat' })">Nouveau Contrat</button>
            </div>

            <div class="col-12 mt-4 table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th>Numéro</th>
                            <th>CIN Marchand</th>
                            <th>Numéro Place</th>
                            <th>Code de l'activité</th>
                            <th>Réalisation</th>
                            <th>Validation</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <TableRow v-for="contrat in contratStore.getContratByAnnee(selectedYear)" :contrat="contrat" v-model="selectedContrat"/>
                    </tbody>
                </table>

                <!--<div id="accordion">

                    <div v-for="contrat in contratStore.contrats" class="card">
                        <div class="card-header">
                            <a class="btn" data-bs-toggle="collapse" :href="`collapse${i++}`">
                                Collapsible Group Item #1
                            </a>
                        </div>
                        <div id="collapseOne" class="collapse" data-bs-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <a class="collapsed btn" data-bs-toggle="collapse" href="#collapseTwo">
                                Collapsible Group Item #2
                            </a>
                        </div>
                        <div id="collapseTwo" class="collapse" data-bs-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <a class="collapsed btn" data-bs-toggle="collapse" href="#collapseThree">
                                Collapsible Group Item #3
                            </a>
                        </div>
                        <div id="collapseThree" class="collapse" data-bs-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                        </div>
                    </div>  

                </div>-->
            </div>
        </div>
    </div>
    <Delete>
        <template v-slot:deleteContrat>
            <div class="modal-body">
                Suppression du contrat numéro: <br>
                {{ selectedContrat }}
            </div>

            <div class="mb-3">
                <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
                <button class="btn btn-danger" data-bs-dismiss="modal">Supprimer</button>
            </div>
        </template>
    </Delete>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Delete from '../components/DeleteModal.vue';
import { useContratStore } from '../stores/contratStore';
import { useTauxStore } from '../stores/tauxStore'; 
import TableRow from '../components/TableRow.vue';

const selectedContrat = ref(null);

const selectedYear = ref(new Date().getFullYear().toString())
const tauxStore = useTauxStore()
const contratStore = useContratStore();
onMounted(() => {
    tauxStore.selectAnnee()
    contratStore.selectContrat()
})

</script>

<style scoped>
.btnAnnuler {
    background-color: var(--bs-gray-300);
}

.btnAnnuler:hover {
    background: white;
    outline: 1px solid var(--bs-primary);
    color: var(--bs-primary);
}
</style>