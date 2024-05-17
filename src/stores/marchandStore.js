import { defineStore } from "pinia";
import axios from "axios";

export const useMarchandStore = defineStore('marchandStore', {
    state: () => ({
        loading: true,
        marchands: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectMarchand() {
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marchand/selectMarchand.php')
                .then((response) => {
                    this.loading = false;
                    this.marchands = response.data.marchands;
                })
        },
        addMarchand(cinVal, nomVal, prenomsVal, datenaissVal, lieunaissVal, datedelivrVal, lieudelivrVal, telVal, adresseVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marchand/addMarchand.php', {
                cin: cinVal,
                nom: nomVal,
                prenoms: prenomsVal,
                datenaiss: datenaissVal,
                lieunaiss: lieunaissVal,
                datedelivr: datedelivrVal,
                lieudelivr: lieudelivrVal,
                tel: telVal,
                adresse: adresseVal,
            })
            .then((response) => {
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteMarchand(params) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marchand/deleteMarchand.php', {
                cin: params
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectMarchand();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateMarchand(oldCinVal, newCinVal, nomVal, prenomsVal, datenaissVal, lieunaissVal, datedelivrVal, lieudelivrVal, telVal, adresseVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marchand/updateMarchand.php', {
                oldCin: oldCinVal,
                newCin: newCinVal,
                nom: nomVal,
                prenoms: prenomsVal,
                datenaiss: datenaissVal,
                lieunaiss: lieunaissVal,
                datedelivr: datedelivrVal,
                lieudelivr: lieudelivrVal,
                tel: telVal,
                adresse: adresseVal
            })
            .then((response) => {
                if (!response.data.error) {
                    this.selectMarchand()
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    },
    getters: {
        getCIN : (state)=>{
            var cin = [];
            state.marchands.map(marchand=>{
                cin.push(marchand.cin)
            })
            return cin;
        },
        getMarchandByCIN : (state)=>{
            return (numCin)=> state.marchands.filter(marchand=>{
                return marchand.cin === numCin
            })
        },
        getByCIN : (state)=>{
            return (numCin)=> {
                if(numCin == ''){
                    return state.marchands
                }else{
                    return state.marchands.filter(marchand=>{
                        return marchand.cin.includes(numCin) 
                    })
                }
            }
        }
    }
})