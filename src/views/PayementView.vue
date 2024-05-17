<template>
    <div class="content">
        <div class="container">
            <h1>Payement</h1>
            
            <form class="was-validated" @submit="suivant">
                <div class="mb-3">
                    <label for="marche" class="form-label">Marché : </label>
                    <select name="marche" id="marche" v-model="nomMarche">
                        <option></option>
                        <option v-for="marche in marcheStore.getListeNomMarche">{{ marche }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="percepteur" class="form-label">Percepteur : </label>
                    <select name="percepteur" id="percepteur" v-model="matriculePercepteur">
                        <option value=""></option>
                        <option v-for="percepteur in percepteurStore.getPercepteurByCodeMarche(marcheStore.getCodeMarcheByNomMarche(nomMarche))" :value="percepteur.matriculePercep">{{ `${percepteur.matriculePercep}: ${percepteur.nomPercep} ${percepteur.prenomsPercep}` }}</option>
                    </select>
                </div>

                <div class="btnGroup mb-4">
                    <input type="submit" :disabled="isMarcheNotSelected || isPercepteurNotSelected" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Suivant">
                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMarcheStore } from '../stores/marcheStore';
import { usePercepteurStore } from '../stores/percepteurStore';
import { onMounted } from 'vue';

const nomMarche = ref('')
const matriculePercepteur = ref('')
const marcheStore = useMarcheStore()
const percepteurStore = usePercepteurStore()

onMounted(()=>{
    marcheStore.selectMarche()
    percepteurStore.selectPercepteur()
})

const isMarcheNotSelected = ref(true)
watch(nomMarche, (newNom, oldNom)=>{
    isMarcheNotSelected.value = newNom == ''
})

const isPercepteurNotSelected = ref(true)
watch(matriculePercepteur, (newNom, oldNom)=>{
    isPercepteurNotSelected.value = newNom == ''
})


const router = useRouter()
const suivant = (event)=>{
    event.preventDefault()

    router.push({
        name: 'listeContrat', 
        params: {
            percepteur : matriculePercepteur.value
        }
    })
}

// const affiche = (matriculePercepteur)=>{
//     var exp = new RegExp("[+]", "g")
//     var tabPercep = matriculePercepteur.split(exp)
//     console.log(tabPercep);
//     console.log(matriculePercepteur);
//     console.log(matriculePercepteur.split(':'));
// }
</script>