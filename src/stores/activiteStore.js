import { defineStore } from "pinia";
import axios from "axios";

export const useActiviteStore = defineStore('activiteStore', {
    state: () => ({
        loading: true,
        activites: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectActivite() {
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/activite/selectActivite.php')
                .then((response) => {
                    this.loading = false;
                    this.activites = response.data.activites;
                })
        },
        addActivite(codeActiviteVal, designActiviteVal, idCategVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/activite/addActivite.php', {
                codeActivite: codeActiviteVal,
                designActivite: designActiviteVal,
                idCateg: idCategVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectActivite();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteActivite(codeActiviteVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/activite/deleteActivite.php', {
                codeActivite: codeActiviteVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectActivite();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateActivite(oldCodeActiviteVal, newCodeActiviteVal, designActiviteVal, idCategVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/activite/updateActivite.php', {
                oldCodeActivite: oldCodeActiviteVal,
                newCodeActivite: newCodeActiviteVal,
                designActivite: designActiviteVal,
                idCateg: idCategVal
            })
            .then((response) => {
                if (!response.data.error) {
                    this.selectActivite()
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    },
    getters: {
        getActiviteByIdCateg: (state) =>{
            return (idCateg)=> state.activites.filter(activite=>{
                return activite.idCateg === idCateg
            })
        },
        getIdCategByCodeActivite: (state) =>{
            return (codeActivite)=> {
                var idCateg = ''
                state.activites.map((activite)=>{
                    if(activite.codeActivite === codeActivite){
                        idCateg = activite.idCateg
                    }
                })
                return idCateg;
            }
        },
        getCodeActivite: (state) =>{
            var codeActivite = []
            state.activites.map(activite=>{
                codeActivite.push(activite.codeActivite)
            })
            return codeActivite;
        }
    }
})