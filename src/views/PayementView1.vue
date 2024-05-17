<template>
    <div class="content">
        <div class="container">
            <h1>Payement</h1>
            
            <div class="row">
                <form>
                    <div class="d-flex mb-2">
                        <label class="form-label me-4" for="filtre">Filtrer par:</label>
                        <select id="filtre" name="filtre" v-model="filtre" @change="clean">
                            <option value="place">Place</option>
                            <option value="nom&prenom">Nom & Prénoms</option>
                            <option value="lot">Lot</option>
                            <option value="percepteur">Percepteur</option>
                        </select>
                    </div>
                    
                    <div class="d-flex mb-2">
                        <input v-if="filtre==='place'" class="form-control me-2" type="number" placeholder="Entrer le numero de la place" v-model="numPlace">
                        <input v-if="filtre==='nom&prenom'" class="form-control me-2" type="text" placeholder="Entrer le nom du marchand" v-model="nomPrenom">
                        <input v-if="filtre==='lot'" class="form-control me-2" type="text" placeholder="Entrer le lot de la place" v-model="lot">
                        <input v-if="filtre==='percepteur'" class="form-control me-2" type="number" placeholder="Entrer le numero du percepteur" v-model="numPercepteur">
                        <button class="btn btn-primary" type="button">Rechercher</button>
                    </div>
                    
                </form>
            </div>
            
            <div v-if="payementStore.loading" class="loading">Chargement...</div>
            
            <div v-else class="col-12 mt-4 table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th>Numero place</th>
                            <th>Nom & Prénoms</th>
                            <th>Lot</th>
                            <th>Percepteur</th>
                            <th>Activité</th>
                            <th>Taux</th>
                            <th>Dernier payement</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="payement in payementStore.payements" @click="nouveauPayement(payement.numPlace, payement.dernierPayement, payement.debutPayement)">
                            <td>{{ payement.numPlace }}</td>
                            <td>{{ payement.nom + " " + payement.prenom }}</td>
                            <td>{{ payement.lot }}</td>
                            <td>{{ payement.percepteur }}</td>
                            <td>{{ payement.activite }}</td>
                            <td>{{ payement.taux + " Ar" }}</td>
                            <td>{{ payement.dernierPayement ? dateFormat(payement.dernierPayement) : "aucun" }}</td>
                            <td>
                                <span v-if="payement.dernierPayement" :class="etat(payement.dernierPayement).class">{{ etat(payement.dernierPayement).notif }}</span>         
                            </td>    
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
import { parse, isBefore} from 'date-fns'
import { usePayementStore } from '../stores/payementStore';
// import { reactive } from 'vue';

const router = useRouter();

const payementStore = usePayementStore()
onMounted(() => {
    payementStore.selectPayement();
    setTimeout(() => {
        // payementStore.selectPayement();
        console.log(payementStore.error);
    }, 200)
    console.log(payementStore.payements);
})

const filtre = ref('place')
const numPlace = ref()
const nomPrenom = ref()
const lot = ref()
const numPercepteur = ref()

function dateFormat(dateString){
    const date = parse(dateString,"yyyy-MM-dd", new Date())
    return date.toLocaleDateString()
}

function clean(){
    numPlace.value = null
    nomPrenom.value = null
    lot.value = null
    numPercepteur.value = null
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

function nouveauPayement (numPlaceVal, dernierPayementVal, debutPayementVal){
    const dernierPayement = dateFormat(dernierPayementVal)
    const debutPayement = dateFormat(debutPayementVal)
    router.push({ name: 'nouveauPayement', query: { numPlace: numPlaceVal, dernierPayement: dernierPayement, debutPayement: debutPayement}})
}

</script>

<style scoped>

.loading {
  margin-top: 40px;
  padding: 20px;
  background-color: lightgreen;
  text-align: center;
}

select{
    padding: 0 10px;
    border-radius: 5px;
    color: var(--bs-primary);
    border: 1px solid var(--bs-primary);
}
option{
    color: var(--bs-gray-800);
}
</style>