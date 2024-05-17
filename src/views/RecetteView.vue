<template>
  <div class="content">
    <div class="container">
      <h1>Recette</h1>
      
      <div class="mb-2 reach">
        <label class="me-3">Année : </label>
        <select v-model="selectedYear" @change="initialiseDate">
          <option v-for="annee in tauxStore.getAnnee">{{ annee }}</option>
        </select>
        <form class="d-flex" @submit="recheche">
            <label class="form-label me-2" for="datedeb">Depuis:</label>
            <input class="form-control me-2" type="date" id="datedeb" name="datedeb" v-model="datedeb" @change="reset" :min="`${selectedYear}-01-01`" :max="`${selectedYear}-12-31`">
            <label class="form-label me-2" for="datefin">à:</label>
            <input class="form-control me-2" type="date" id="datefin" name="datefin" v-model="datefin" @change="reset" :min="`${selectedYear}-01-01`" :max="`${selectedYear}-12-31`">
            
            <input class="btn btn-primary" type="submit" value="Rechercher" :disabled="datedeb > datefin">
        </form>
        <span v-if="datedeb > datefin" style="color: var(--bs-danger);">Date de debut doit être inferieur à la fin de date</span>
      </div>
      
      <div class="col-12 mt-4 table-responsive" v-if="recettesParMarche.length">
          <table class="table table-striped table-hover">
              <thead>
                  <tr class="table-primary">
                      <th>Code Marché</th>
                      <th>Marché</th>
                      <th>Montant</th>
                      <th>Minimum Requis</th>
                      <th>Ratio</th>
                      <th></th>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="recette in recettesParMarche">
                      <td>{{ recette.codeMarche }}</td>
                      <td>{{ recette.nomMarche }}</td>
                      <td>{{ montantString(recette.montant) }}</td>
                      <td>{{ montantString(recette.montantMin) }}</td>
                      <td>{{ ratio(recette.montant, recette.montantMin) }}</td>
                      <td> 
                        <button class="btn btn-primary btn-sm" @click="infoMarche(recette.codeMarche)">Détailles</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div class="col-12 mt-4 table-responsive" v-if="recettesParPercepteur.length">
          <h5>{{"Marché : " + nomMarche  }}</h5>
          <table class="table table-striped table-hover">
              <thead>
                  <tr class="table-primary">
                      <th>Code Percepteur</th>
                      <th>Nom & Prénoms</th>
                      <th>Montant</th>
                      <th>Minimum Requis</th>
                      <th>Ratio</th>
                      <th></th>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="recette in recettesParPercepteur">
                      <td>{{ recette.codePercepteur }}</td>
                      <td>{{ recette.nomPercepteur + " " + (recette.prenomsPercepteur != undefined ? recette.prenomsPercepteur: "")}}</td>
                      <td>{{ montantString(recette.montant) }}</td>
                      <td>{{ montantString(recette.montantMin) }}</td>
                      <td>{{ ratio(recette.montant, recette.montantMin) }}</td>
                      <td> 
                        <button class="btn btn-primary btn-sm" @click="infoPercepteur(recette.codePercepteur)">Détailles</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div class="col-12 mt-4 table-responsive" v-if="recettesParPlace.length">
          <h5>Percepteur : {{ percepteur }}</h5>
          <table class="table table-striped table-hover">
              <thead>
                  <tr class="table-primary">
                      <th>Numéro Place</th>
                      <th>Nom & Prénoms</th>
                      <th>Lot</th>
                      <th>Jours Payés</th>
                      <th>Jours à payer</th>
                      <th>Montant</th>
                      <th>Minimum Requis</th>
                      <th>Ratio</th>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="recette in recettesParPlace">
                      <td>{{ recette.numPlace }}</td>
                      <td>{{ recette.nomMarchand + " " + (recette.prenomMarchand != undefined ? recette.prenomMarchand: "")}}</td>
                      <td>{{ recette.lot }}</td>
                      <td>{{ recette.joursPayes }}</td>
                      <td>{{ recette.joursAPayer }}</td>
                      <td>{{ montantString(recette.montant) }}</td>
                      <td>{{ montantString(recette.montantMin) }}</td>
                      <td>{{ ratio(recette.montant, recette.montantMin) }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecetteStore } from '../stores/recetteStore';
import { useTauxStore } from '../stores/tauxStore';
// import { deAT } from 'date-fns/locale';

// const currentDate = ref(new Date())
// const minDate = ref(new Date(currentDate.value.getFullYear(), 0, 1))
// const maxDate = ref(new Date(currentDate.value.getFullYear(), 11, 31))

const selectedYear = ref(new Date().getFullYear())
const tauxStore = useTauxStore()

const datedeb = ref()
const datefin = ref()
onMounted(()=>{
  tauxStore.selectAnnee();
  initialiseDate()
})

const initialiseDate = ()=>{
  datedeb.value = `${selectedYear.value}-01-01`;
  datefin.value = `${selectedYear.value}-12-31`;
  reset()
}

const recettesParMarche = ref([])
const nomMarche = ref()
const recettesParPercepteur = ref([])
const percepteur = ref()
const recettesParPlace = ref([])
const recetteStore = useRecetteStore()

const reset = () => {
  recettesParMarche.value = []
  recettesParPercepteur.value = []
  recettesParPlace.value = []
}

const recheche = (event) => {
  event.preventDefault()
  recetteStore.selectRecette(datedeb.value, datefin.value)
  setTimeout(() => {
    recettesParMarche.value = recetteStore.getByMarche
  }, 200)
  
}

const infoMarche = (codeMarche) => {
  recettesParPercepteur.value = []
  recettesParPlace.value = []
  setTimeout(() => {
    recettesParPercepteur.value = recetteStore.getByPercepteur(codeMarche)
    const marche = recettesParMarche.value.filter( recette => recette.codeMarche === codeMarche)[0]
    nomMarche.value = marche.nomMarche
  }, 200)
}

const infoPercepteur = (codePercepteur) => {
  recettesParPlace.value = []
  setTimeout(() => {
    recettesParPlace.value = recetteStore.getByPlace(codePercepteur)
    const percep = recetteStore.recettes.filter( recette => recette.codePercepteur === codePercepteur)[0]
    percepteur.value = percep.codePercepteur + " " + percep.nomPercepteur + " " + (percep.prenomsPercepteur != undefined ? percep.prenomsPercepteur: "")
  }, 200)
}

const montantString = (montant) => {
  let montantString = ""
  let index = 0
  for(let indexCurrent = montant.toString().length-1; indexCurrent>=0 ; indexCurrent-- ){
    if(index!=3){
      montantString = montant.toString()[indexCurrent] + montantString
      index++
    }else{
      montantString = montant.toString()[indexCurrent] + " " + montantString
      index = 1
    }
  }
  return montantString + " Ar"
}

const ratio = (montant, montantMin) => {
  if(montantMin !== 0)
    return (montant/montantMin * 100).toFixed(2) + " %"
  else
    return ""
}

</script>

<style scoped>
.reach{
    border: 1px solid var(--bs-gray-300);
    padding: 20px;
}
</style>