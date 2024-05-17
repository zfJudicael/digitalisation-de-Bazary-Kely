<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Nouveau Contrat</h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push({ name: 'contrat'})" class="btn btn-primary col-4 col-sm-3 col-md-2">
          <i class="bi bi-backspace"></i> Retour
        </button>
      </div>

      <form @submit="saveContrat" class="was-validated pb-4">
        <div class="row">
          <div class="mb-3 col-12 col-sm-6">
            <label for="numContrat" class="form-label">Numéro du contrat:</label>
            <input type="text" class="form-control" id="numContrat" name="numContrat" v-model='contrat.numContrat' readonly>
          </div>
          
          <div class="mb-3 col-12 col-sm-6">
            <label for="dateContrat" class="form-label">Date de la réalisation :</label>
            <input type="date" v-model="contrat.dateContrat" class="form-control" id="dateContrat" name="dateContrat" required>
          </div>
        </div>
        
        <div class="mb-3">
          <label for="cinMarchand" class="form-label">CIN Marchand:</label>
          <input type="text" ref="cinRef" v-model="contrat.cinMarchand" class="form-control" id="cinMarchand" placeholder="Entrer le numéro CIN du marchand" name="cinMarchand" maxlength="12" required>
          <p v-if="isCINExisted" style="color: green; font-size: smaller;">Numéro CIN reconnu</p>
          <p v-else style="color: red; font-size: smaller;">Numéro CIN non valide ou non enregistré</p>
        </div>

        <div class="mb-4">
          <label for="marche" class="form-label">Marché : </label>
          <select name="marche" id="marche" v-model="contrat.codeMarche">
            <option></option>
            <option v-for="marche in marcheStore.getListeMarche" :value="marche.codeMarche">{{ marche.nomMarche }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="numPlace" class="form-label">Numéro Place:</label>
          <select name="numPlace" id="numPlace" :disabled="!isMarcheSelected" v-model="contrat.numPlace">
            <option></option>
            <option v-for="place in placeStore.getPlacesDisponibleByCodeMarche(contrat.codeMarche)">{{ place.numPlace }}</option>
          </select>
          <div v-if="!isMarcheSelected">
            <p style="color: red; font-size: smaller;">Selectionnez le marché </p>
          </div>

          <!-- <input class="form-control" ref="numPlaceRef" :disabled="!isMarcheSelected" type="text" name="numPlace" placeholder="Entrer le numéro de la place" id="numPlace" v-model="contrat.numPlace" required>
          <div v-if="isMarcheSelected">
            <p v-if="isNumPlaceExisted" style="color: green; font-size: smaller;">Place reconnu</p>
            <p v-else style="color: red; font-size: smaller;">Place n'est pas dans le marché choisi ou n'existe pas </p>
          </div>
          <div v-else>
            <p style="color: red; font-size: smaller;">Selectionnez le marché </p>
          </div> -->
        </div>  

        <div class="mb-4">
          <label for="activite" class="form-label">Activité : </label>
          <select name="activite" id="activite" v-model="contrat.codeActivite">
            <option></option>
            <option v-for="code in activiteStore.getCodeActivite">{{ code }}</option>
          </select>
          <div v-if="isActiviteEmpty" style="color: red; font-size: smaller">Selectionnez une activité</div>
        </div>
        
        <div class="mb-3">
          <label for="annee" class="form-label">Année : </label>
          <select name="annee" id="annee" v-model="contrat.annee">
            <option></option>
            <option v-for="annee in tauxStore.annees">{{ annee.annee }}</option>
          </select>
          <p v-if="isAnneeEmpty" style="color: red; font-size: smaller;">Veuillez selectionner une année svp</p>
        </div>

        <div class="mb-3">
          <label for="dateExp" class="form-label">Date d'expiration : </label>
          <input type="date" name="dateExp" id="dateExp" class="form-control" v-model="contrat.dateExpiration" readonly required>
        </div>
        
        <div class="mb-3">
          <label for="dateDeb" class="form-label">Début payement : </label>
          <input type="date" name="dateDeb" id="dateDeb" class="form-control" v-model="contrat.debPayement" required>
        </div>

        

        <!-- <div class="mb-4">
          <label for="activite" class="form-label">Activité:</label>
          <select name="activite" id="activite" v-model="contrat.codeActivite">
            <option></option>
            <option v-for="code in activiteStore.getCodeActivite">{{ code}}</option>
          </select>
          <datalist id="activites">
            <option v-for="i in 50" value='test'>{{"Edge" + i}}</option>
          </datalist>
        </div>  -->

        <div v-if="!isResponseEmpty">
          <p v-if="contratStore.error" style="color: red;">Ajout non effectué</p>
          <p v-else style="color: green;">Ajout bien effectué</p>
        </div>
        
        <div class="btnGroup mb-4">
          <input type="submit" :disabled=" !isMarcheSelected || isNumPlaceEmpty || isActiviteEmpty || isAnneeEmpty" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
          <input class="btnAnnuler col-sm-3 col-lg-2" type="reset" value="Effacer">
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch} from 'vue';
import { useMarchandStore } from '../../stores/marchandStore';
import { usePlaceStore } from '../../stores/placeStore';
import { useActiviteStore } from '../../stores/activiteStore';
import { useTauxStore } from '../../stores/tauxStore';
import { useMarcheStore } from '../../stores/marcheStore';
import { useContratStore } from '../../stores/contratStore';

const contrat = reactive({
  numContrat : '',
  cinMarchand : '',
  nomMarche: '',
  codeMarche: '',
  numPlace : '',
  codeActivite : '',
  annee : '',
  debPayement: '',
  dateContrat: '',
  dateExpiration: ''
})

const activiteStore = useActiviteStore()
const marcheStore = useMarcheStore()
const marchandStore = useMarchandStore()
const placeStore = usePlaceStore()
const tauxStore = useTauxStore()
const contratStore = useContratStore()

onMounted(()=>{
  activiteStore.selectActivite()
  marchandStore.selectMarchand()
  placeStore.selectPlaceDisponible()
  tauxStore.selectAnnee()
  marcheStore.selectMarche()
})

const isCINExisted = ref(false)
watch(()=>contrat.cinMarchand, (newCIN, oldCIN)=>{
  isCINExisted.value = marchandStore.getCIN.includes(newCIN.toString())
})

const isNumPlaceEmpty = ref(true)
const isNumPlaceExisted = ref(false)
watch(()=>contrat.numPlace, (newNum, oldNum)=>{
  contrat.numContrat = `${contrat.annee%2000}-${newNum}`
  isNumPlaceEmpty.value = newNum == ''
  isNumPlaceExisted.value = placeStore.getNumPlaceByCodeMarche(marcheStore.getCodeMarcheByNomMarche(contrat.nomMarche)).includes(newNum.toString())
})

const isMarcheSelected = ref(false)
watch(()=>contrat.codeMarche, (newNom, oldNom)=>{
  contrat.numPlace = ''
  isMarcheSelected.value = newNom != ''
})

const isActiviteEmpty = ref(true)
watch(()=>contrat.codeActivite, (newCode, oldCode)=>{
  isActiviteEmpty.value = newCode == ''
})

const isAnneeEmpty = ref(true)
watch(()=>contrat.annee, (newAnnee, oldAnnee)=>{
  contrat.numContrat = `${newAnnee%2000}-${contrat.numPlace}`
  newAnnee === '' ? contrat.dateExpiration = '': contrat.dateExpiration = `${newAnnee}-12-31`
  isAnneeEmpty.value = newAnnee == ''
})

const isResponseEmpty = ref(true)
const cinRef = ref(null)
const saveContrat = (event)=>{
  event.preventDefault()

  if(!isCINExisted.value){

    cinRef.value.focus()

  }else{

      contratStore.addContrat(contrat.numContrat, contrat.cinMarchand, contrat.nomMarche, contrat.numPlace, contrat.codeActivite, contrat.annee, contrat.debPayement, contrat.dateContrat, contrat.dateExpiration)
      
      setTimeout(()=>{
        isResponseEmpty.value = false;

        if(!contratStore.error){
          contrat.numContrat = ''
          contrat.cinMarchand = ''
          contrat.nomMarche = ''
          contrat.numPlace = ''
          contrat.codeActivite = ''
          contrat.annee = ''
          contrat.debPayement = ''
          contrat.dateContrat = ''
        }
        else{
          console.log(contratStore.errorMessage);
        }
      }, 300)
    
  }

}



// const date = ref(new Date().getUTCDate("dd/MM/yyyy"))
// const numplace = ref('')
// let numContrat = ref('')
// const annee = ref('')

// function changed (){
//   numContrat = annee.value.substring(2) +'-'+ numplace.value
//   console.log(annee.value)
//   console.log(date)
// }

// function validationActivite(){
//   const inputElement = document.getElementById('activite');
//   const datalistOptions = document.getElementById('activites').getElementsByTagName('option');
//   const inputValue = inputElement.value;
//   let valid = false;
  
//   for(let i = 0; i < datalistOptions.length; i++){
//     if (inputValue === datalistOptions[i].value) {
//       valid = true;
//       break;
//     }
//   }
//   if(!valid)
//     inputElement.value = '';
    
// }
</script>

<style scoped>
.btnGroup{
  display: flex;
  justify-content: center;
}
</style>