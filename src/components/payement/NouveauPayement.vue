<template>
  <div class="content">
    <div class="container">
      <div class="d-flex" style="align-items: center;">
        <h1>Nouveau Payement</h1>
        <span class="badge bg-success" style="margin-left: 20px;" v-if="route.query.dernierPayement == '00/00/0000'" >Premier payement</span>
      </div>
      
      <div class="d-flex justify-content-end">
        <button @click="router.go(-1)" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
      </div>

      <form class="was-validated">
        <div class="row">
          <div class="mb-3 col-12 col-sm-6">
            <label for="numPlace" class="form-label">Numéro Place:</label>
            <input type="text" class="form-control" id="numPlace" name="numPlace" v-model="numPlace" readonly>
          </div>

          <div class="mb-3 col-12 col-sm-6" v-if="route.query.dernierPayement == '00/00/0000' ">
            <label for="debutPayement" class="form-label">Debut payement:</label>
            <input type="text" class="form-control" id="debutPayement" name="debutPayement" v-model="debutPayement" readonly>
          </div>

          <div class="mb-3 col-12 col-sm-6" v-else>
            <label for="dernierPayement" class="form-label">Dernier payement:</label>
            <input type="text" class="form-control" id="dernierPayement" name="dernierPayement" v-model="dernierPayement" readonly>
          </div>

          <div class="mb-3 col-12 col-sm-6">
            <label for="nombreJ" class="form-label">Nombre de jours:</label>
            <input type="number" class="form-control" id="nombreJ" name="nombreJ" autofocus v-model="nombreJour" min="1" @keypress="reset()" required>
            <div class="invalid-feedback">Entrer le nombre de jours à payer</div>
          </div>
          
          <div class="d-flex justify-content-end">
            <button class="btn btn-success col-12 col-sm-6 col-md-5 col-lg-3" @click="ajoutdate" :disabled="payements.length">Entrer le numéro du ticket</button>
          </div>
        </div>
      </form>
   
      <form @submit="savePayement" class="was-validated mt-4 pb-5" v-if="payements.length && nombreJour>0">
        <div class="row">
          <p class="center">Jours à payer</p>
          
          <div class="mb-3 col-sm-4 col-md-3 col-lg-2" v-for="payement in payements">
            <label class="form-label">{{ payement.dateStr }}:</label>
            <input type="text" class="form-control" placeholder="N° Ticket" v-model="payement.numTicket" required>
            <p class="error" v-if="payement.isNumTicketExisted">Ticket vendu</p>
          </div>

          <input type="submit" class="btn btn-primary" value="Valider">
        </div>
      </form>
    </div>
  </div>  

  <div class="modal fade" id="successModal" ref="modalRef">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <!-- <div class="modal-header pt-4">
          
        </div> -->

        <!-- Modal Body -->
        <div class="modal-body">
          <h1 class="d-flex col-12 justify-content-center p-4">
            <i class="bi bi-check-circle"></i>
          </h1>
          <h4>Done</h4>
          <p class="text">
            Your request successfully send.
          </p>
          
          <button class="btn btn-success m-3" data-bs-dismiss="modal">DONE</button>
          <a class="btnClose" data-bs-dismiss="modal"><i class="bi bi-x-circle-fill"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { parse, addDays } from 'date-fns'
import { usePayementStore } from '../../stores/payementStore';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { onUpdated } from 'vue';
import { watch } from 'vue';

const route = useRoute()
const router = useRouter()

const numPlace = ref()
const debutPayement = ref()
const dernierPayement = ref()
const nombreJour = ref()
const modalRef = ref()

const payementStore = usePayementStore()
onMounted(() => {
  debutPayement.value = route.query.debutPayement; 
  numPlace.value = route.query.numPlace;
  dernierPayement.value = route.query.dernierPayement;
  payementStore.selectNumTicket()
  reset()
})

const countIsNumTicketExisted = ref(0)
var jour = null

const payements = ref([])

const reset = () => {
  if(route.query.dernierPayement == '00/00/0000'){
    const datedeb = parse(debutPayement.value,"dd/MM/yyyy", new Date())
    jour = addDays(datedeb, -1).toLocaleDateString()
  }else {
    jour = route.query.dernierPayement
  } 
  payements.value = []
}

onUpdated(() => {
  countIsNumTicketExisted.value = 0
  payements.value.map( payement => {
    watch(() => payement.numTicket, (newNumTicket, oldNumTicket) => {
      payement.isNumTicketExisted = false
      payementStore.getNumTicket.map(numTicket =>{
        if (numTicket === newNumTicket){
          payement.isNumTicketExisted = true;
        }
      })      
    })
    
    if(!payement.isNumTicketExisted)
      countIsNumTicketExisted.value++
  })
})


const ajoutdate = (event) => {
  event.preventDefault()

  if(nombreJour.value){
    if(route.query.dernierPayement == '00/00/0000'){
      jour = addDays(parse(route.query.debutPayement,"dd/MM/yyyy", new Date()), -1)
    }else {
      jour = parse(route.query.dernierPayement,"dd/MM/yyyy", new Date())
    }
    
    for (let index = 0; index < nombreJour.value; index++) {
      
      const j = jour.getDay()
      if(j == '6'){
        jour = addDays(jour, 2)
      } else{
        jour = addDays(jour, 1)
      }

      payements.value.push({dateStr: jour.toLocaleDateString('en-GB'), date:jour, numTicket:'', isNumTicketExisted: false})

    }
  }
}

const savePayement = (event) => {
  event.preventDefault();
  // console.log(parse(route.query.dateContrat,"dd/MM/yyyy", new Date()));
  if(payements.value.length == countIsNumTicketExisted.value){

    var datePayement = convertDate(new Date());
    var dateContrat = convertDate(parse(route.query.dateContrat,"dd/MM/yyyy", new Date()));
    var derniereDatePaye = '';
    var script = '';
    var datePaye = '';
    for (let index = 0; index<payements.value.length; index++){
      datePaye = convertDate(payements.value[index].date)
      if(script === ''){
        script = `('${payements.value[index].numTicket}', ${numPlace.value}, '${datePaye}', '${datePayement}', '${dateContrat}')`
      }else{
        script = script+`, ('${payements.value[index].numTicket}', ${numPlace.value}, '${datePaye}', '${datePayement}', '${dateContrat}')`
      }
      derniereDatePaye = datePaye
    }
    payementStore.addPayement(script, derniereDatePaye, route.query.numContrat, dateContrat)

    
    // console.log(script);
    // console.log(datePaye);

    // for (let index = 0; index<payements.value.length; index++) {
    //   var datePaye = addDays(payements.value[index].date, 1) 
    //   payementStore.addPayement(numPlace.value, datePayement, datePaye, payements.value[index].numTicket, route.query.numContrat, parse(route.query.dateContrat, "dd/MM/yyyy", new Date()).toLocaleDateString('en-GB'), addDays(parse(route.query.dateContrat,"dd/MM/yyyy", new Date()), 1) )
    // }
  }
}

const convertDate = (date)=>{
  var dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return dateStr;
}

</script>

<style scoped>
.error{
  padding-top: 5px;
  color: var(--bs-danger);
  font-size: smaller;
}
.center{
  color: var(--bs-gray-600);
  width: 100%;
  text-align: center;
}
.center::before, .center::after{
  content: '';
  width: 40%;
  border: 1px solid var(--bs-gray-500);
}
</style>
