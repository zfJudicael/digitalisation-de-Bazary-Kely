<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Modification Percepteur</h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push({ name: 'percepteur'})" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
      </div>

    
      <form @submit="saveMarchand" @change="isInputChanged= true" class="was-validated pb-4">
        <div class="mb-3">
          <label for="matricule" class="form-label">Matricule:</label>
          <input type="text" ref="matriculeRef" v-model="percepteur.matricule" autofocus class="form-control" id="matricule" placeholder="Entrer le numéro matricule" name="matricule" required>
          <div class="invalid-feedback">Remplissez le numéro matricule svp!</div>
          <p v-if="isMatriculeExisted" class="error">Ce numéro matricule existe déjà</p>
        </div>

        <div class="mb-3">
          <label for="nom" class="form-label">Nom:</label>
          <input type="text" v-model="percepteur.nom" class="form-control" id="nom" placeholder="Entrer le nom" name="nom" required>
          <div class="invalid-feedback">Remplissez le nom svp!</div>
        </div>

        <div class="mb-3">
          <label for="prenoms" class="form-label">Prénoms:</label>
          <input class="form-control" v-model="percepteur.prenoms" type="text" name="prenoms" placeholder="Entrer le prénom" id="prenoms">
        </div>  

        <!-- <div class="mb-3">
          <label for="marche" class="form-label">Marché:</label>
          <input class="form-control" v-model="nomMarche" type="text" name="marche" placeholder="Entrer le prénom" id="marche" readonly>
        </div> -->

        <div class="mb-3">
          <label for="contact" class="form-label">Contact:</label>
          <input type="text" v-model="percepteur.tel" class="form-control" id="contact" placeholder="Entrer le numéro telephone" name="contact" required>
          <div class="invalid-feedback">Remplissez le numéro telephone svp!</div>
        </div>

        <div class="mb-3">
          <label for="adresse" class="form-label">Adresse:</label>
          <input type="text" v-model="percepteur.adresse" class="form-control" id="adresse" placeholder="Entrer le numéro telephone" name="adresse" required>
          <div class="invalid-feedback">Remplissez l'adresse svp!</div>
        </div>

        <div v-if="!isResponseEmpty">
          <p v-if="percepteurStore.error" style="color: red;">Modification non effectuée</p>
          <p v-else style="color: green;">Modification bien effectuée</p>
        </div>

        <div class="btnGroup">
          <input type="submit" :disabled="!isInputChanged" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
          <input class="btnAnnuler col-sm-3 col-lg-2 disabled" type="button" @click="$router.push({name: 'percepteur'})" value="Annuler">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePercepteurStore } from '../../stores/percepteurStore';
// import { useMarcheStore } from '../../stores/marcheStore';

// const marcheStore = useMarcheStore()
const percepteurStore = usePercepteurStore()
const route = useRoute()
const router = useRouter()

const isInputChanged = ref(false)

const percepteur = reactive({
  matricule: '',
  nom: '',
  prenoms: '',
  tel: '',
  adresse: ''
})

// const nomMarche = ref('')

onMounted(()=>{
  percepteurStore.selectPercepteur();
  // marcheStore.selectMarche()

  percepteur.matricule = route.params.matricule
  setTimeout(()=>{
    // nomMarche.value = marcheStore.getNomMarche(route.params.codeMarche)[0].nomMarche
    percepteur.nom = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].nomPercep
    percepteur.prenoms = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].prenomsPercep
    percepteur.tel = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].telPercep
    percepteur.adresse = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].adressePercep
  }, 300)
})

const isMatriculeExisted = ref(false) 
watch(()=>percepteur.matricule, (newMatricule, oldMatricule)=>{
  if(newMatricule === route.params.matricule){
    isMatriculeExisted.value = false
  }else{
    isMatriculeExisted.value = percepteurStore.getMatricule.includes(newMatricule.toString())
  }
})

const isResponseEmpty = ref(true)
const matriculeRef = ref(null)
const saveMarchand = (event)=>{
  event.preventDefault();

  if(isMatriculeExisted.value){
    matriculeRef.value.focus()
  }else{
    percepteurStore.updatePercepteur(route.params.matricule, percepteur.matricule, percepteur.nom, percepteur.prenoms, percepteur.tel, percepteur.adresse)
  }

  setTimeout(()=>{
    isResponseEmpty.value = false
    isInputChanged.value = false
  }, 300)
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