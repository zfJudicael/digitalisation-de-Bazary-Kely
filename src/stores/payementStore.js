import { defineStore } from "pinia";
import axios from "axios";

export const usePayementStore = defineStore('payementStore', {
  state: () => ({
    loading: true,
    payements: [],
    numTickets: [],
    error: null,
    message: '',
    errorMessage: ''
  }),
  actions: {
    selectPayement(numPlaceVal=null, nom_prenomVal=null, lotVal=null, percepteurVal=null){
      axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/payement/selectPayement.php', {
        numPlace: numPlaceVal,
        nom_prenom: nom_prenomVal,
        lot: lotVal,
        percepteur: percepteurVal
      })
        .then((response) => {
          this.loading = false;
          this.payements = response.data.payements; 
        })
    },
    selectNumTicket(){
      axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/payement/selectNumTickets.php')
        .then((response) => {
          this.numTickets = response.data.numTickets
        })
    },
    select(numContratVal, dateContratVal, datePayeVal){
      axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/payement/select.php', {
        numContrat: numContratVal,
        dateContrat: dateContratVal
      })
      .then((response) => {
        console.log(response.data.contrats);
        console.log(response.data.dateContrat);
      })
    },    
    // addPayement(numPlaceVal, datePayementVal, datePayeVal, numTicketVal, numContratVal, dateContratVal, contratVal){
    //   axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/payement/addPayement.php', {
    //     numTicket: numTicketVal,
    //     numPlace: numPlaceVal,
    //     datePaye: datePayeVal,
    //     datePayement: datePayementVal,
    //     numContrat: numContratVal,
    //     dateContrat: dateContratVal,
    //     contrat : contratVal
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     this.error = response.data.error
    //     this.message = response.data.message
    //     this.errorMessage = response.data.errorMessage
    //   })
    // }
    addPayement(valuesVal, derniereDatePayeVal, numContratVal, dateContratVal){
      axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/payement/addPayement.php', {
        values: valuesVal,
        derniereDatePaye: derniereDatePayeVal,
        numContrat : numContratVal,
        dateContrat: dateContratVal
      })
      .then((response) => {
        console.log(JSON.parse(JSON.stringify(response.data)));
        this.error = response.data.error
        this.message = response.data.message
        this.errorMessage = response.data.errorMessage
      })
    }
  },
  getters: {
    getNumTicket : (state) => {
      var numTicketsVal = []
      state.numTickets.map(numTicket => {
        numTicketsVal.push(numTicket.numTicket)
      })
      return numTicketsVal;
    }
  }
})