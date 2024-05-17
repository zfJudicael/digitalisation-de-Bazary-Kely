import { defineStore } from "pinia";
import axios from "axios";

export const useContratStore = defineStore('contratStore', {
    state: () => ({
        loading: true,
        contrats: [],
        contratsForPayment: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectContrat(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/contrat/selectContrat.php')
            .then((response) => {
                this.loading = false;
                this.contrats = response.data.contrats;
                // console.log(JSON.parse(JSON.stringify(response.data)));
            })
        },
        selectContratForPayment(matriPercepVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/contrat/selectContratForPayment.php', {
                matriPercep: matriPercepVal
            })
            .then((response) => {
                this.loading = false;
                this.contratsForPayment = response.data.contrats;
            })
        },
        addContrat(numContratVal, cinMarchandVal, nomMarcheVal, numPlaceVal, codeActiviteVal, anneeVal, debPayementVal, dateContratVal, dateExpirationVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/contrat/addContrat.php', {
                numContrat : numContratVal,
                cinMarchand : cinMarchandVal,
                nomMarche : nomMarcheVal,
                numPlace : numPlaceVal,
                codeActivite : codeActiviteVal,
                annee : anneeVal,
                debPayement : debPayementVal,
                dateContrat : dateContratVal,
                dateExpiration : dateExpirationVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectContrat();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateContrat(numContratVal, cinMarchandVal, codeActiviteVal, newDateContratVal, debPayementVal, dateExpirationVal, oldDateContratVal, valideVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/contrat/updateContrat.php', {
                numContrat : numContratVal,
                cinMarchand : cinMarchandVal,
                codeActivite : codeActiviteVal,
                newDateContrat: newDateContratVal,
                debPayement : debPayementVal,
                dateExpiration : dateExpirationVal,
                oldDateContrat : oldDateContratVal,
                valide : valideVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectContrat();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
    },
    getters: {
        getContratForPayementByAnnee: (state)=>{
            return (annee)=> state.contratsForPayment.filter(contrat=>{
                return contrat.annee === annee;
            })
        },
        getContratByAnnee: (state)=>{
            return (annee)=> state.contrats.filter((contrat)=>{
                return contrat.annee == annee;
            })
        },
        getContratByNumContratAndDateContrat: (state)=>{
            return (numContrat, dateContrat)=>state.contrats.filter((contrat)=>{
                return contrat.numContrat == numContrat && contrat.dateContrat == dateContrat;
            })
        },
        getContratForPayement: (state)=>{
            return (numContrat, cinMarchand, numPlace, annee)=>{
                if(numContrat != ''){
                    return state.contratsForPayment.filter((contrat)=>{
                        return contrat.annee == annee && contrat.numContrat.includes(numContrat)
                    })
                }else if(cinMarchand != ''){
                    return state.contratsForPayment.filter((contrat)=>{
                        return contrat.annee == annee && contrat.cinMarchand.includes(cinMarchand)
                    })
                }else if(numPlace != ''){
                    return state.contratsForPayment.filter((contrat)=>{
                        return contrat.annee == annee && contrat.numPlace.includes(numPlace)
                    })
                }else {
                    return state.contratsForPayment.filter((contrat)=>{
                        return contrat.annee == annee
                    })
                }
            }
        }
    }
})