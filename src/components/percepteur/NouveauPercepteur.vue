<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Nouveau Percepteur</h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push({ name: 'percepteur'})" class="btn btn-primary col-4 col-sm-3 col-md-2">
          <i class="bi bi-backspace"></i> Retour
        </button>
      </div>

    
      <form @submit="addPercepteur" class="was-validated pb-4">
        <div class="mb-3">
          <label for="matricule" class="form-label">Matricule :</label>
          <input v-model="percepteur.matricule" ref="matriculeRef" type="texte" autofocus class="form-control" id="matricule" percepteurholder="Entrer le numéro matricule" name="matricule" required>
          <div class="invalid-feedback">Remplissez le numéro matricule svp!</div>
          <p v-if="isMatriculeExisted" class="error">Ce numéro matricule existe déjà</p>
        </div>

        <div class="mb-3">
          <label for="nom" class="form-label">Nom :</label>
          <input v-model="percepteur.nom" type="text" class="form-control" id="nom" percepteurholder="Entrer le nom" name="nom" required>
          <div class="invalid-feedback">Remplissez le nom svp!</div>
        </div>

        <div class="mb-3">
          <label for="prenoms" class="form-label">Prénoms :</label>
          <input v-model="percepteur.prenoms" class="form-control" type="text" name="prenoms" percepteurholder="Entrer le prénom" id="prenoms">
        </div>  

        <div class="mb-3">
          <label for="marche" class="form-label">Marché :</label>
          <input v-model="nomMarche" class="form-control" type="text" name="marche" percepteurholder="Entrer le prénom" id="marche" readonly required>
        </div>

        <div class="mb-3">
          <label for="contact" class="form-label">Contact :</label>
          <input v-model="percepteur.tel" type="text" class="form-control" id="contact" percepteurholder="Entrer le numéro telephone" name="contact" required>
          <div class="invalid-feedback">Remplissez le numéro telephone svp!</div>
        </div>

        <div class="mb-3">
          <label for="adresse" class="form-label">Adresse :</label>
          <input v-model="percepteur.adresse" type="text" class="form-control" id="adresse" percepteurholder="Entrer le numéro telephone" name="adresse" required>
          <div class="invalid-feedback">Remplissez le numéro telephone svp!</div>
        </div>

        <div v-if="!isResponseEmpty">
          <p v-if="percepteurStore.error" style="color: red;">Ajout non effectué</p>
          <p v-else style="color: green;">Ajout bien effectué</p>
        </div>

        <div class="btnGroup">
          <input type="submit" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
          <input class="btnAnnuler col-sm-3 col-lg-2 disabled" type="button" @click="()=>{
            resetValue()
            isResponseEmpty = true
          }" value="Effacer">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useMarcheStore } from '../../stores/marcheStore';
import { useRoute } from 'vue-router';
import { usePercepteurStore } from '../../stores/percepteurStore';

const percepteur = reactive({
  matricule: '',
  nom: '',
  prenoms: '',
  tel: '',
  adresse: ''
})
const nomMarche = ref('')

const route = useRoute()

const marcheStore = useMarcheStore();
const percepteurStore = usePercepteurStore();

onMounted(()=>{
  marcheStore.selectMarche()
  percepteurStore.selectPercepteur()

  setTimeout(()=>{
    nomMarche.value = marcheStore.getNomMarche(route.params.codeMarche)[0].nomMarche
  }, 300)
})

const isMatriculeExisted = ref(false) 
watch(()=>percepteur.matricule, (newMatricule, oldMatricule)=>{
  isMatriculeExisted.value = percepteurStore.getMatricule.includes(newMatricule.toString())
})

const matriculeRef = ref(null)
const isResponseEmpty = ref(true)
const addPercepteur = (event)=>{
  event.preventDefault()

  if(isMatriculeExisted.value){
    matriculeRef.value.focus()
  }else{
    percepteurStore.addPercepteur(percepteur.matricule, percepteur.nom.toUpperCase(), percepteur.prenoms, percepteur.tel, percepteur.adresse, route.params.codeMarche);

    setTimeout(()=>{
          isResponseEmpty.value = false;
          if(!percepteurStore.error){
            resetValue()
          }
      }, 300)
  }
}

const resetValue = ()=>{
  percepteur.matricule = ''            
  percepteur.nom = ''
  percepteur.prenoms = ''
  percepteur.tel = ''
  percepteur.adresse = ''
}

</script>

<style scoped>
.error{
  color: red;
  font-size: smaller;
}
.btnGroup{
  display: flex;
  justify-content: center;
}
</style>