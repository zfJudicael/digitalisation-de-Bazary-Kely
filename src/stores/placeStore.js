import { defineStore } from "pinia";
import axios from "axios";

export const usePlaceStore = defineStore('placeStore', {
    state: () => ({
        loading: true,
        places: [],
        placesDisponible: [],
        placesNonSuivies: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectPlace(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/place/selectPlace.php')
            .then((response) => {
                this.loading = false;
                this.places = response.data.places;
            })
        },
        selectPlaceDisponible(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/place/selectPlaceDisponible.php')
            .then((response) => {
                this.loading = false;
                this.placesDisponible = response.data.places;
            })
        },
        selectPlaceNonSuivie(){
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/place/selectPlaceNonSuivie.php')
            .then((response) => {
                this.loading = false;
                this.placesNonSuivies = response.data.places;
            })
        },
        addPlace(numPlaceVal, lotPlaceVal, codeMarcheVal, matriculePercepVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/place/addPlace.php', {
                numPlace: numPlaceVal,
                lotPlace: lotPlaceVal,
                codeMarche: codeMarcheVal,
                matriculePercep: matriculePercepVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectPlace();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updatePlace(oldNumPlaceVal, newNumPlaceVal, oldLotPlaceVal, newLotPlaceVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/place/updatePlace.php', {
                oldNumPlace: oldNumPlaceVal,
                newNumPlace: newNumPlaceVal,
                oldLotPlace: oldLotPlaceVal,
                newLotPlace: newLotPlaceVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectPlace();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteMarche(numPlaceVal, lotPlaceVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/place/deletePlace.php', {
                numPlace: numPlaceVal,
                lotPlace: lotPlaceVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectPlace();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    },
    getters: {
        getNumPlace : (state)=>{
            var numPlaces = [];
            state.places.map(place=>{
                numPlaces.push(place.numPlace)
            })
            return numPlaces;
        },
        getLotPlace : (state)=>{
            var lotPlaces = [];
            state.places.map(place=>{
                lotPlaces.push(place.lotPlace)
            })
            return lotPlaces;
        },
        getNumPlaceByCodeMarche : (state)=>{
            return (codeMarche)=> {
                var numPlaces = []
                state.places.map((place)=>{
                    if(place.codeMarche === codeMarche){
                        numPlaces.push(place.numPlace)
                    }
                })
                return numPlaces;
            }
        },
        getPlaceByCodeMarche: (state)=>{
            return (codeMarche)=> state.places.filter((place)=>{
                return place.codeMarche === codeMarche
            })
        },
        getPlacesNonSuiviesByCodeMarche: (state)=>{
            return (codeMarche)=> state.placesNonSuivies.filter((place)=>{
                return place.codeMarche === codeMarche
            })
        },
        getPlacesDisponibleByCodeMarche: (state)=>{
            return (codeMarche)=> state.placesDisponible.filter((place)=>{
                return place.codeMarche === codeMarche
            })
        },
        getPlaceByNumPlace : (state)=>{
            return (numPlace)=> state.places.filter((place)=>{
                return place.numPlace == numPlace
            })
        }
    }
})