<template>
    <div class="content">
        <div class="container">
            <h1>Payement</h1>

            <div class="d-flex justify-content-end">
                <button @click="$router.push('/payement')" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
            </div>

            <span class="form-label me-4">Année : </span>
            <select v-model="selectedYear" id="selecteee">
                <option v-for="taux in tauxStore.annees">{{ taux.annee }}</option>
            </select>
            
            <div class="row">
                <form>
                    <div class="d-flex mb-2">
                        <label class="form-label me-4" for="filtre">Filtrer par:</label>
                        <select id="filtre" name="filtre" v-model="filtre" @change="clear">
                            <option value="numContrat">Numéro contrat</option>
                            <option value="numPlace">Numéro place</option>
                            <option value="cinMarchand">Numéro cin du Marchand</option>
                        </select>
                    </div>
                    
                    <div class="d-flex mb-2">
                        <input v-if="filtre=='numContrat' " class="form-control me-2" type="number" placeholder="Entrer le numéro du contrat" v-model="numContratToFind">
                        <input v-else-if="filtre=='numPlace' " class="form-control me-2" type="text" placeholder="Entrer le numéro de la place" v-model="numPlaceToFind">
                        <input v-else-if="filtre=='cinMarchand' " class="form-control me-2" type="text" placeholder="Entrer le numéro de la CIN du marchand" v-model="cinMarchandToFind">
                        <button class="btn btn-primary" type="button">Rechercher</button>
                    </div>
                    
                </form>
            </div>
            
            <div v-if="contratStore.loading" class="loading">Chargement...</div>
            
            <div v-else class="col-12 mt-4 table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th>Numero contrat</th>
                            <th>CIN marchand</th>
                            <th>Numéro place</th>
                            <th>Activité</th>
                            <th>Taux</th>
                            <th>Dernier payement</th>
                            <th>Etat de payement</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="contrat in contratStore.getContratForPayement(numContratToFind, cinMarchandToFind, numPlaceToFind, selectedYear)">
                            <td>{{ contrat.numContrat }}</td>
                            <td>{{ contrat.cinMarchand }}</td>
                            <td>{{ contrat.numPlace }}</td>
                            <td>{{ contrat.codeActivite }}</td>
                            <td v-if="tauxStore.getTauxByAnneeAndIdCateg(selectedYear, activiteStore.getIdCategByCodeActivite(contrat.codeActivite)).length > 0">
                                <p v-for="taux in tauxStore.getTauxByAnneeAndIdCateg(selectedYear, activiteStore.getIdCategByCodeActivite(contrat.codeActivite))">{{ taux.taux }} Ar</p>
                            </td>
                            <td v-else>
                                <button class="badge bg-success">--</button>
                            </td>
                            <td>{{ contrat.dernierPayement == '00/00/0000' ? '--' : contrat.dernierPayement }}</td>
                            <td ><span :class="etat(contrat.dernierPayement).class">{{ etat(contrat.dernierPayement).notif }}</span></td>
                            <td style="color: var(--bs-primary); font-size: 18px;">
                                <a @click="nouveauPayement(contrat.numPlace, contrat.dernierPayement, contrat.debPayement, contrat.numContrat, contrat.dateContrat)"><i class="bi bi-pencil-square"></i></a>
                            </td>   
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue';
import { parse, isBefore} from 'date-fns'
import { useContratStore } from '../../stores/contratStore';
import { useTauxStore } from '../../stores/tauxStore';
import { useActiviteStore } from '../../stores/activiteStore';

const router = useRouter();
const route = useRoute()

const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear.toString())

const contratStore = useContratStore();
const activiteStore = useActiviteStore()
const tauxStore = useTauxStore();

onMounted(() => {
    contratStore.selectContratForPayment(route.params.percepteur)
    tauxStore.selectTaux()
    tauxStore.selectAnnee()
    activiteStore.selectActivite()
})

const filtre = ref('numContrat')
const numPlace = ref()
const nomPrenom = ref()
const lot = ref()
const numPercepteur = ref()

const numContratToFind = ref('');
const cinMarchandToFind = ref('');
const numPlaceToFind = ref(''); 
function clear(){
    numContratToFind.value = ''
    cinMarchandToFind.value = ''
    numPlaceToFind.value = ''
}

function dateFormat(dateString){
    const date = parse(dateString,"yyyy-MM-dd", new Date())
    return date.toLocaleDateString()
}

function etat(jour){
    const dateActuelle = new Date()
    const dernierPayement = parse(jour,"yyyy-MM-dd", new Date())
    const response = [{
        class : "badge bg-success",
        notif : "En avance"
    },
    {
        class : "badge bg-danger",
        notif : "En retard"
    },
    {
        class : "badge bg-primary",
        notif : "p" 
    }]

    if(isBefore(dateActuelle, dernierPayement))
        return response[0]
    else
        return response[1]
}

function nouveauPayement (numPlaceVal, dernierPayementVal, debutPayementVal, numContratVal, dateContratVal){
    router.push({ 
        name: 'nouveauPayement', 
        query: {
            numPlace: numPlaceVal,
            dernierPayement: dernierPayementVal,
            debutPayement: debutPayementVal,
            numContrat: numContratVal,
            dateContrat: dateContratVal
        }
    })
}

</script>

<style scoped>

.loading {
  margin-top: 40px;
  padding: 20px;
  background-color: lightgreen;
  text-align: center;
}

option{
    color: var(--bs-gray-800);
}
</style>