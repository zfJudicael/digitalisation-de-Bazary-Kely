<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Nouveau Place</h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push({ name: 'place'})" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
      </div>

    
      <form @submit="savePlace">
        <div class="mb-3">
          <label for="numero" class="form-label">Numéro:</label>
          <input type="number" ref="numPlaceRef"  v-model="place.numPlace" class="form-control" id="numero" placeholder="Entrer le numéro de la place" name="numero">
          <p v-if="isNumPlaceExisted" class="error">Ce numéro existe déjà</p>
        </div>

        <div class="mb-3">
          <label for="lot" class="form-label">Lot:</label>
          <input type="text" ref="lotPlaceRef" v-model="place.lotPlace" class="form-control" id="lot" placeholder="Entrer lot de la place" name="lot" required>
          <div class="invalid-feedback">Remplissez lot de la place svp!</div>
          <p v-if="isLotPlaceExisted" class="error">Ce lot existe déjà</p>
        </div>

        <div class="mb-3">
          <label for="marche" class="form-label">Marché :</label>
          <input v-model="nomMarche" type="text" class="form-control" id="marche" name="marche" readonly required>
        </div>

        <div class="mb-3">
          <label for="percepteur" class="form-label">Percepteur :</label>
          <select name="percepteur" id="percepteur" v-model="matriculePercepteur" required>
            <option value=""></option>
            <option v-for="percepteur in percepteurStore.getPercepteurByCodeMarche($route.params.codeMarche)" :value="percepteur.matriculePercep">{{ `${percepteur.matriculePercep}: ${percepteur.nomPercep} ${percepteur.prenomsPercep}`}}</option>
          </select>
          <div class="invalid-feedback">Remplissez le numéro du percepteur svp!</div>
        </div>

        <div v-if="!isResponseEmpty">
          <p v-if="placeStore.error" style="color: red;">Ajout non effectué</p>
          <p v-else style="color: green;">Ajout bien effectué</p>
        </div>

        <div class="btnGroup mb-4">
          <input :disabled="!isPercepteurSelected" type="submit" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
          <input @click="resetValue" class="btnAnnuler col-sm-3 col-lg-2 disabled" type="button" value="Effacer">
        </div>
      </form>
    </div>
  </div>
  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted, watch } from 'vue'; 
import { useMarcheStore } from '../../stores/marcheStore';
import { usePlaceStore } from '../../stores/placeStore';
import { usePercepteurStore } from '../../stores/percepteurStore';

const route = useRoute()
const place = reactive({
  numPlace: '',
  lotPlace: ''
})
const nomMarche = ref('')
const numPlaceRef = ref(null)
const lotPlaceRef = ref(null)
const matriculePercepteur = ref('')

const marcheStore = useMarcheStore()
const placeStore = usePlaceStore()
const percepteurStore = usePercepteurStore()
onMounted(()=>{
  marcheStore.selectMarche()
  placeStore.selectPlace()
  percepteurStore.selectPercepteur()

  setTimeout(()=>{
    nomMarche.value = marcheStore.getNomMarche(route.params.codeMarche)[0].nomMarche
  }, 300)  
})

const isResponseEmpty = ref(true)
const savePlace = (event)=>{
  event.preventDefault()
  matriculePercepteur.value = percepteur.value.split(':')[0]
  if(isNumPlaceExisted.value){
    numPlaceRef.value.focus()
  }else{
    if(isLotPlaceExisted.value){
      lotPlaceRef.value.focus()
    }else{
      placeStore.addPlace(place.numPlace, place.lotPlace, route.params.codeMarche, matriculePercepteur.value);
      setTimeout(()=>{
          isResponseEmpty.value = false;
          if(!placeStore.error){
            place.numPlace = ''            
            place.lotPlace = ''
          }
      }, 300)
    }
  }  
}

const resetValue = (event)=>{
  event.preventDefault()
  place.numPlace = ''
  place.lotPlace = ''
  isResponseEmpty.value = true
}

const isNumPlaceExisted = ref(false)
watch(()=> place.numPlace, (newNumPlace, oldNumPlace)=>{
  isNumPlaceExisted.value = placeStore.getNumPlace.includes(newNumPlace.toString())
})

const isLotPlaceExisted = ref(false)
watch(()=> place.lotPlace, (newLotPlace, oldLotPlace)=>{
  isLotPlaceExisted.value = placeStore.getLotPlace.includes(newLotPlace)
})

const isPercepteurSelected = ref(false)
watch(matriculePercepteur,(newPercep, oldPercep)=>{
  isPercepteurSelected.value = newPercep != '';
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