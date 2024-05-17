<template>
  <div class="content">
    <div class="container">
      <h1><i class="bi bi-bookmark-plus-fill"></i> Nouveau Marché</h1>

      <div class="d-flex justify-content-end">
        <button @click="$router.push('/marche')" class="btn btn-primary col-4 col-sm-3 col-md-2"><i class="bi bi-backspace"></i> Retour</button>
      </div>

      <div class="row">
        <form @submit="saveMarche" class="was-validated">
          <div class="mb-3">
            <label for="id" class="form-label">Identifiant:</label>
            <input v-model="marche.codeMarche" ref="codeMarcheRef" type="text" autofocus class="form-control" id="id" placeholder="Entrer l'identifiant du marché" name="id" required>
            <div class="invalid-feedback">Remplissez l'identifiant svp!</div>
            <div v-if="isCodeMarcheExisted" style="color: red; font-size: smaller;">Cet identifiant existe déjà</div>
          </div>

          <div class="mb-3">
            <label for="nom" class="form-label">Nom:</label>
            <input v-model="marche.nomMarche" type="text" class="form-control" id="nom" placeholder="Entrer le nom du marché" name="nom" required>
            <div class="invalid-feedback">Remplissez le nom du marché svp!</div>
          </div>
        
          <div class="mb-3">
            <label for="arrondissementVal">Arrondissement:</label>
            <select v-model="marche.nomArrond" id="arrondissementVal" name="arrondissementVal" class="form-select" required>
              <option></option>
              <option v-for="arrondissement in arrondissementStore.arrondissements">{{ arrondissement.nomArrond }}</option>
            </select>
          </div>

          <div class="btnGroup mb-1">
            <input type="submit" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
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
import { reactive, ref, onMounted, watch } from 'vue';
import { useMarcheStore } from '../../stores/marcheStore';
import { useArrondissementStore } from '../../stores/arrondissementStore';
import ModalView from '../ModalView.vue'
import { useRouter } from 'vue-router'

const marche = reactive({
  codeMarche: '',
  nomMarche: '',
  nomArrond: ''
})
const isResponseEmpty = ref(true)

const marcheStore = useMarcheStore()
const arrondissementStore = useArrondissementStore()

onMounted(()=>{
  arrondissementStore.selectArrondissement()
  marcheStore.selectMarche()
})

const codeMarcheRef = ref(null)
const saveMarche = (event)=>{
  event.preventDefault()

  if(isCodeMarcheExisted.value){
    codeMarcheRef.value.focus()
  }else{
    marcheStore.addMarche(marche.codeMarche, marche.nomMarche, marche.nomArrond)
    setTimeout(()=>{
      isResponseEmpty.value = false
    }, 200)
  }
  
}

const router = useRouter()
function closeModal(){
  isResponseEmpty.value = true
  if(!marcheStore.error){
    router.push('/marche')
  }
}

const isCodeMarcheExisted = ref(false)
watch(()=>marche.codeMarche, (newCode, oldCode)=>{
  isCodeMarcheExisted.value = marcheStore.getCodeMarche.includes(newCode.toString())
})

</script>

<style scoped>
 .btnGroup{
    display: flex;
    justify-content: center;
  }
</style>