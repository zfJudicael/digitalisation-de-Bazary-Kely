import { defineStore } from "pinia";
import axios from "axios";

export const useTauxStore = defineStore('tauxStore', {
    state: () => ({
        loading: true,
        taux: [],
        annees: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectTaux() {
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/taux/selectTaux.php')
                .then((response) => {
                    this.loading = false;
                    this.taux = response.data.taux;
                })
        },
        selectAnnee() {
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/taux/selectAnnee.php')
                .then((response) => {
                    this.loading = false;
                    this.annees = response.data.annees;
                })
        },
        addTaux(anneeVal, idCategVal, tauxVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/taux/addTaux.php', {
                annee: anneeVal,
                idCateg: idCategVal,
                taux: tauxVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectTaux();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteTaux(codetauxVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/taux/deleteTaux.php', {
                codetaux: codetauxVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectTaux();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateTaux(anneeVal, idCategVal, tauxVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/taux/updateTaux.php', {
                annee: anneeVal,
                idCateg: idCategVal,
                taux: tauxVal
            })
            .then((response) => {
                if (!response.data.error) {
                    this.selectTaux()
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    },
    getters: {
        getTauxByAnneeAndIdCateg: (state) =>{
            return (annee, idCateg)=> state.taux.filter(taux=>{
                return (taux.annee === annee) && (taux.idCateg === idCateg)
            })
        },
        getTauxByAnnee: (state)=>{
            return (annee)=> state.taux.filter(taux=>{
                return (taux.annee === annee)
            })
        },
        getAnnee: (state) =>{
            var annees = [] 
            state.annees.map(annee=>{
                annees.push(annee.annee)
            })
            return annees
        }
    }
})