import { defineStore } from "pinia";
import axios from "axios";

export const useMarcheStore = defineStore('marcheStore', {
    state: () => ({
        loading: true,
        marches: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectMarche(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marche/selectMarche.php')
            .then((response) => {
                this.loading = false;
                this.marches = response.data.marches;
            })
        },
        addMarche(codeMarcheVal, nomMarcheVal, nomArrondVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marche/addMarche.php', {
                codeMarche: codeMarcheVal,
                nomMarche: nomMarcheVal,
                nomArrond: nomArrondVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectMarche();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateMarche(oldCodeMarcheVal, newCodeMarcheVal, nomMarcheVal, nomArrondVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marche/updateMarche.php', {
                oldCodeMarche: oldCodeMarcheVal,
                newCodeMarche: newCodeMarcheVal,
                nomMarche: nomMarcheVal,
                nomArrond: nomArrondVal
            })
            .then((response) => {
                if (!response.data.error) {
                    this.selectMarche()
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteMarche(codeMarcheVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/marche/deleteMarche.php', {
                codeMarche: codeMarcheVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectMarche();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    }, 
    getters: {
        getNomMarche : (state)=>{
            return (codeMarche)=> state.marches.filter(marche=>{
                return marche.codeMarche === codeMarche
            })
        },
        getListeMarche : (state)=>{
            return state.marches
        },
        getListeNomMarche : (state)=>{
            var nomMarche = []
            state.marches.map(marche=>{
                nomMarche.push(marche.nomMarche)
            })
            return nomMarche;
        },
        getCodeMarcheByNomMarche : (state)=>{
            return (nomMarche)=> {
                var codeMarche = ''
                state.marches.map((marche)=>{
                    if(marche.nomMarche === nomMarche){
                        codeMarche = marche.codeMarche
                    }
                })
                return codeMarche;
            }
        },
        getCodeMarche : (state)=>{
            var codeMarche = []
            state.marches.map(marche=>{
                codeMarche.push(marche.codeMarche)
            })
            return codeMarche;
        }
    }
})