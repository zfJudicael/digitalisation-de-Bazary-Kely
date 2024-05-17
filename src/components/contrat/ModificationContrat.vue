<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Modification contrat</h1>
      <p>Numéro :  {{ route.params.numContrat }}</p>
      <p>Réalisé le : {{route.params.dateContrat }}</p>

      <div class="d-flex justify-content-end">
        <button @click="$router.push('/contrat')" class="btn btn-primary col-4 col-sm-3 col-md-2"><i
            class="bi bi-backspace"></i> Retour</button>
      </div>

      <form class="was-validated" @submit="saveChange">

        <div class="mb-3 col-sm-6">
          <label for="cin" class="form-label">Numéro CIN du marchand:</label>
          <input type="number" ref="cinRef" v-model="contrat.cinMarchand" class="form-control" id="cin" name="cin" required max="999999999999" min="100000000000" :readonly="!isValide">
          <p v-if="isCINExisted" style="color: green; font-size: smaller;">Numéro CIN reconnu</p>
          <p v-else style="color: red; font-size: smaller;">Numéro CIN non valide ou non enregistré</p>
        </div>

        <div class="mb-3 col-sm-6" v-if="contrat.dernierPayement == '0000-00-00' ">
          <label for="activite" class="form-label me-4">Activite :</label>
          <input v-if="!isValide" type="text" name="ativite" id="activite" v-model="contrat.codeActivite" readonly>
          <select v-else name="activite" id="activite" v-model="contrat.codeActivite">
            <option v-for="activite in activiteStore.activites" :value="activite.codeActivite">
              {{ `${activite.codeActivite} : ${activite.designActivite}` }}
            </option>
          </select>
        </div>

        <div class="mb-3 col-sm-6">
          <label for="dateContrat" class="form-label">Date contrat (mm/dd/YYYY):</label>
          <input type="date" v-model="contrat.dateContrat" class="form-control" id="dateContrat" name="dateContrat" required :readonly="!isValide">
        </div>

        <div class="mb-3 col-sm-6" v-if="contrat.dernierPayement == '0000-00-00' ">
          <label for="debPayement" class="form-label">Début payement (mm/dd/YYYY):</label>
          <input type="date" v-model="contrat.debPayement" class="form-control" id="debPayement" name="debPayement" required :readonly="!isValide">
        </div>

        <div class="mb-3 col-sm-6">
          <label for="dateExpi" class="form-label">Date d'expiration du contrat (mm/dd/YYYY):</label>
          <input type="date" v-model="contrat.dateExpiration" class="form-control" id="dateExpi" name="dateExpi" required :readonly="!isValide">
        </div>

        
        <div class="mb-3 col-sm-6" v-if="!isValide">
          <label for="validation" class="form-label me-4">Validation :</label>
          <select name="validation" id="validation" v-model="contrat.valide">
            <option value="1">Valide</option>
            <option value="0">Expiré</option>
          </select>
          <div v-if="!isValide" style="color: red; font-size: smaller;">Ce contrat est expiré, veuillez selectionner 'Expiré', si ce n'est pas encore le cas, dans la liste déroulante pour liberer la place</div>
        </div>

        <div v-if="!isResponseEmpty">
          <p v-if="contratStore.error" style="color: red;">Ajout non effectué</p>
          <p v-else style="color: green;">Ajout bien effectué</p>
        </div>

        <div class="btnGroup col-12 mb-4 mt-4">
          <input type="submit"  class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
          <button class="btn btnAnnuler col-4 col-sm-3 col-lg-2 me-2"
                @click="(event)=>{
                  event.preventDefault()
                  $router.push('/contrat')
                }">Annuler</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useContratStore } from '../../stores/contratStore';
import { useMarchandStore } from '../../stores/marchandStore';
import { useActiviteStore } from '../../stores/activiteStore';
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue';
import { ref } from 'vue';
import { differenceInDays, parse } from 'date-fns';


const contrat = reactive({
  numContrat: '',
  cinMarchand: '',
  numPlace: '',
  codeActivite: '',
  annee: '',
  debPayement: '',
  dateContrat: '',
  dernierPayement: '',
  dateExpiration: '',
  valide: ''
})

const route = useRoute();
const router = useRouter();
const activiteStore = useActiviteStore();
const contratStore = useContratStore();
const marchandStore = useMarchandStore()
const isValide = ref(true);
const currentDate = new Date()
onMounted(() => {
  activiteStore.selectActivite()
  contratStore.selectContrat()
  marchandStore.selectMarchand()

  setTimeout(() => {
    contratStore.getContratByNumContratAndDateContrat(route.params.numContrat, route.params.dateContrat).map((con)=>{
      contrat.numContrat = con.numContrat
      contrat.cinMarchand = con.cinMarchand
      contrat.numPlace = con.numPlace
      contrat.codeActivite = con.codeActivite
      contrat.annee = con.annee
      contrat.debPayement = con.debPayement
      contrat.dateContrat = con.dateContrat
      contrat.dernierPayement = con.dernierPayement
      contrat.dateExpiration = con.dateExpiration
      contrat.valide = con.valide
    isValide.value = differenceInDays(parse(con.dateExpiration, "yyyy-MM-dd", new Date()), currentDate ) >= 0
    })
  }, 300)
})

const isCINExisted = ref(false)
watch(()=>contrat.cinMarchand, (newCIN, oldCIN)=>{
  isCINExisted.value = marchandStore.getCIN.includes(newCIN.toString())
})

const isResponseEmpty = ref(true)
const cinRef = ref(null)
const saveChange = (event)=>{
  event.preventDefault()

  if(isCINExisted.value){
    contratStore.updateContrat(route.params.numContrat, contrat.cinMarchand, contrat.codeActivite, contrat.dateContrat, contrat.debPayement, contrat.dateExpiration, route.params.dateContrat, contrat.valide)
  
    setTimeout(()=>{
      isResponseEmpty.value = false;

      if(!contratStore.error){
        setTimeout(()=>{
          router.push('/contrat')
        })
      }
      
    }, 300)
  }else{
    cinRef.value.focus()
  }
  
}

</script>

<style scoped></style>