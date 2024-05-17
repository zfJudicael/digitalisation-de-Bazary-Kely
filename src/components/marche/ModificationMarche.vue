<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Modification Marché</h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push('/marche')" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
      </div>

      <div class="row">
        <form @submit="saveMarche" class="was-validated">
          <div class="mb-3">
            <label for="id" class="form-label">Identifiant:</label>
            <input type="text" v-model="marche.codeMarche" v-autofocus class="form-control" id="id" placeholder="Entrer l'identifiant du marché" name="id" required>
            <div class="invalid-feedback">Remplissez l'identifiant svp!</div>
          </div>

          <div class="mb-3">
            <label for="nom" class="form-label">Nom:</label>
            <input type="text" v-model="marche.nomMarche" class="form-control" id="nom" placeholder="Entrer le nom du marché" name="nom" required>
            <div class="invalid-feedback">Remplissez le nom du marché svp!</div>
          </div>
        
          <div class="mb-3">
            <label for="actuelArrondissement">Actuel Arrondissement:</label>
            <input type="text" v-model="$route.query.nomArrond" class="form-control" id="actuelArrondissement" placeholder="Arrondissement de la marché" readonly required>
          </div>

          <div class="mb-3">
            <label for="arrondissement">Nouveau Arrondissement:</label>
            <select v-model="marche.nomArrond" id="arrondissement" name="arrondissement" class="form-select" required>
              <option></option>
              <option v-for="arrondissement in arrondissementStore.arrondissements">{{ arrondissement.nomArrond }}</option>
            </select>
          </div>

          <div class="btnGroup mb-1">
            <input type="submit" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider" :disabled="isNomArrondEmpty">
            <input class="btnAnnuler col-sm-3 col-lg-2 disabled" type="reset" value="Effacer">
          </div>
        </form>
      </div>
      
    </div> 
  </div>

  <Teleport to="#modal" v-if="!isResponseEmpty">
    <ModalView @closeModal="closeModal">
      <template v-slot:nouveauMarche>
        <div class="modal-body">
          <h1 class="d-flex col-12 justify-content-center p-4">
            <i class="bi bi-check-circle"></i>
          </h1>
          <h4>{{ marcheStore.error ? 'Echec de la requête' : 'Requête acceptée' }}</h4>
          <p class="text" :class="marcheStore.error ? 'fail' : 'succes'">
           {{ marcheStore.message }}
          </p>
          <button class="btn btn-success m-3" @click="closeModal">Okay</button>
        </div>
      </template>
    </ModalView>
  </Teleport>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArrondissementStore } from '../../stores/arrondissementStore';
import { useMarcheStore } from '../../stores/marcheStore';
import ModalView from '../ModalView.vue'

const route = useRoute()
const router = useRouter()
const marche = reactive({
  codeMarche:'',
  nomMarche:'',
  nomArrond:''
})

const arrondissementStore = useArrondissementStore()
const marcheStore = useMarcheStore()

onMounted(()=>{
  arrondissementStore.selectArrondissement()
  marcheStore.selectMarche()
  marche.codeMarche = route.params.codeMarche
  marche.nomMarche = route.query.nomMarche
})

const isNomArrondEmpty = ref(true)
watch(()=> marche.nomArrond, (newNomArrond, oldNomArrond)=>{
  isNomArrondEmpty.value = newNomArrond.length == 0
})

const isResponseEmpty = ref(true)
const saveMarche = (event)=>{
  event.preventDefault()
  marcheStore.updateMarche(route.params.codeMarche, marche.codeMarche, marche.nomMarche, marche.nomArrond)

  setTimeout(()=>{
    isResponseEmpty.value = false
  }, 300)
}

const closeModal =()=>{
  isResponseEmpty.value = true;
  if(!marcheStore.error){
    router.push('/marche')
  }
}
</script>

<style scoped>
 .btnGroup{
    display: flex;
    justify-content: center;
  }
</style>