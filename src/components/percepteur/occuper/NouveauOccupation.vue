<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Assigner une nouvele place pour {{ route.params.matricule }} : {{ `${nomPercep} ${prenomsPercep}` }} </h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push({ name: 'placeOccuper'})" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
      </div>
    
      <form @submit="saveOccupation">
        <div class="mb-3">
          <label class="form-label">Numéro:</label>
          <select v-model="place.numPlace">
            <option></option>
            <option v-for="place in placeStore.getPlacesNonSuiviesByCodeMarche(route.params.codeMarche)">{{ place.numPlace }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="lot" class="form-label">Lot :</label>
          <input type="text" ref="lotPlaceRef" v-model="place.lotPlace" class="form-control" id="lot" placeholder="Lot de la place selectionnée" name="lot" readonly required>
        </div>

        <div class="mb-3">
          <label for="marche" class="form-label">Marché :</label>
          <input v-model="nomMarche" type="text" class="form-control" id="marche" name="marche" readonly required>
        </div>

        <div v-if="!isResponseEmpty">
          <p v-if="placeStore.error" style="color: red;">Ajout non effectué</p>
          <p v-else style="color: green;">Ajout bien effectué</p>
        </div>

        <div class="btnGroup mb-4">
          <input type="submit" :disabled="isNumPlaceEmpty" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
          <input @click="resetValue" class="btnAnnuler col-sm-3 col-lg-2 disabled" type="button" value="Effacer">
        </div>
      </form>
    </div>
  </div>
  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted, watch } from 'vue'; 
import { useMarcheStore } from '../../../stores/marcheStore';
import { usePlaceStore } from '../../../stores/placeStore';
import { usePercepteurStore } from '../../../stores/percepteurStore';
import { useOccupationStore } from '../../../stores/occupationStore';

const route = useRoute()
const place = reactive({
  numPlace: '',
  lotPlace: ''
})
const nomMarche = ref('')
const lotPlaceRef = ref(null)

const marcheStore = useMarcheStore()
const placeStore = usePlaceStore()
const occupationStore = useOccupationStore()
const percepteurStore = usePercepteurStore()
const nomPercep = ref('')
const prenomsPercep = ref('')
onMounted(()=>{
  marcheStore.selectMarche()
  placeStore.selectPlace()
  percepteurStore.selectPercepteur()
  placeStore.selectPlaceNonSuivie()

  setTimeout(()=>{
    nomMarche.value = marcheStore.getNomMarche(route.params.codeMarche)[0].nomMarche
    nomPercep.value = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].nomPercep
      prenomsPercep.value = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].prenomsPercep
  }, 300)  
})

const isResponseEmpty = ref(true)
const saveOccupation = (event)=>{
  event.preventDefault()

  occupationStore.addOccuper(route.params.matricule, place.numPlace)

  setTimeout(()=>{
    isResponseEmpty.value = false
  }, 300)
}

const resetValue = (event)=>{
  event.preventDefault()
  place.numPlace = ''
  place.lotPlace = ''
  isResponseEmpty.value = true
}

const isNumPlaceEmpty = ref(true)
watch(()=> place.numPlace, (newNumPlace, oldNumPlace)=>{
  isNumPlaceEmpty.value = newNumPlace.length == 0

  if(newNumPlace.length > 0) place.lotPlace = placeStore.getPlaceByNumPlace(newNumPlace)[0].lotPlace
  
})

</script>

<style scoped>
.error{
  color: red;
  font-size: smaller;
}
.btnGroup{
  display: flex;
  justify-content: center;
}
</style>