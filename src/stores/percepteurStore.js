import { defineStore } from "pinia";
import axios from "axios";

export const usePercepteurStore = defineStore('percepteurStore', {
    state: () => ({
        loading: true,
        percepteurs: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectPercepteur(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/percepteur/selectPercepteur.php')
            .then((response) => {
                this.loading = false;
                this.percepteurs = response.data.percepteurs;
            })
        },
        addPercepteur(matriculePercepVal, nomPercepVal, prenomsPercepVal, telPercepVal, adressePercepVal, codeMarcheVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/percepteur/addPercepteur.php', {
                matriculePercep: matriculePercepVal,
                nomPercep: nomPercepVal,
                prenomsPercep: prenomsPercepVal,
                telPercep: telPercepVal,
                adressePercep: adressePercepVal,
                codeMarche: codeMarcheVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectPercepteur();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updatePercepteur(oldMatriculePercepVal, newMatriculePercepVal, nomPercepVal, prenomsPercepVal, telPercepVal, adressePercepVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/percepteur/updatePercepteur.php', {
                oldMatriculePercep: oldMatriculePercepVal,
                newMatriculePercep: newMatriculePercepVal,
                nomPercep: nomPercepVal,
                prenomsPercep: prenomsPercepVal,
                telPercep: telPercepVal,
                adressePercep: adressePercepVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectPercepteur();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deletePercepteur(matriculePercepVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/percepteur/deletePercepteur.php', {
                matriculePercep: matriculePercepVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectPercepteur();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    }, 
    getters: {
        getMatricule : (state)=>{
            var matricules = [];
            state.percepteurs.map(percepteur=>{
                matricules.push(percepteur.matriculePercep)
            })
            return matricules;
        },
        getPercepteurByCodeMarche : (state)=>{
            return (codeMarche)=> state.percepteurs.filter((percepteur)=>{
                return percepteur.codeMarche === codeMarche
            })
        },
        getPercepteurByMatricule : (state)=>{
            return (matricule)=> state.percepteurs.filter((percepteur)=>{
                return percepteur.matriculePercep === matricule
            })
        }
    }
})