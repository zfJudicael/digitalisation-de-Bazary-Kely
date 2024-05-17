import { defineStore } from "pinia";
import axios from "axios";

export const useCategorieStore = defineStore('categorieStore', {
    state: () => ({
        loading: true,
        categories: [],
        error: null,
        message: '',
        errorMessage: ''
    }),
    actions: {
        selectCategorie() {
            axios.get('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/categorie/selectCategorie.php')
                .then((response) => {
                    this.loading = false;
                    this.categories = response.data.categories;
                })
        },
        addCategorie(idCategVal, designCategVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/categorie/addCategorie.php', {
                idCateg: idCategVal,
                designCateg: designCategVal,
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectCategorie();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        deleteCategorie(idCategVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/categorie/deleteCategorie.php', {
                idCateg: idCategVal
            })
            .then((response) => {
                if (!response.data.error){
                    this.selectCategorie();
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        },
        updateCategorie(oldIdCategVal, newIdCategVal, designCategVal) {
            axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/categorie/updateCategorie.php', {
                oldIdCateg: oldIdCategVal,
                newIdCateg: newIdCategVal,
                designCateg: designCategVal,
            })
            .then((response) => {
                if (!response.data.error) {
                    this.selectCategorie()
                }
                this.error = response.data.error
                this.message = response.data.message
                this.errorMessage = response.data.errorMessage;
            })
        }
    }
})