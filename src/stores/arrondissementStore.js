import { defineStore } from "pinia";
import axios from "axios";

export const useArrondissementStore = defineStore('arrondissementStore', {
    state: () => ({
        loading: true,
        arrondissements: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectArrondissement() {
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/arrondissement/selectArrondissement.php')
                .then((response) => {
                    this.loading = false;
                    this.arrondissements = response.data.arrondissements;
                })
        },
        addArrondissement(nomArrondVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/arrondissement/addArrondissement.php', {
                nomArrond: nomArrondVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectArrondissement();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteArrondissement(nomArrondVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/arrondissement/deleteArrondissement.php', {
                nomArrond: nomArrondVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectArrondissement();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateArrondissement(oldNomArrondVal ,newNomArrondVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/arrondissement/updateArrondissement.php', {
                oldNomArrond: oldNomArrondVal,
                newNomArrond: newNomArrondVal
            })
            .then((response) => {
                if (!response.data.error) {
                    this.selectArrondissement()
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    }
})