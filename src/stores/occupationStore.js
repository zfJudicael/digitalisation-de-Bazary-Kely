import { defineStore } from "pinia";
import axios from "axios";  

export const useOccupationStore = defineStore('occupationStore', {
    state: () => ({
        loading: true,
        occuper: [],
        placeOccupe: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectOccuper(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/occupation/selectOccuper.php')
            .then((response) => {
                this.loading = false;
                this.occuper = response.data.occuper;
            })
        },
        selectPlaceOccupe(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/occupation/selectPlaceOccupe.php')
            .then((response) => {
                this.loading = false;
                this.placeOccupe = response.data.placeOccupe;
            })
        },
        addOccuper(matriculePercepVal, numPlaceVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/occupation/addOccuper.php', {
                matriculePercep: matriculePercepVal,
                numPlace: numPlaceVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectOccuper();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updatePlace(matriculePercepVal, numPlaceVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/occupation/updateOccuper.php', {
                matriculePercep: matriculePercepVal,
                numPlace: numPlaceVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectOccuper();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    },
    getters: {
        getPlaceByMatriPercep : (state)=>{
            return (matriculePercep)=> state.placeOccupe.filter((place)=>{
                return place.matriPercep == matriculePercep
            })
        },
    }
})