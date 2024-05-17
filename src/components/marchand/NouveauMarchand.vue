<template>

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6 mb-3">
            <h1><i class="bi bi-bookmark-plus-fill"></i> Nouveau Marchand</h1>
            <p class="text">Remplissez bien le formulaire d'ajout avec les pièces jointes:
            <ul class="text">
              <li>Certificat de Résidence</li>
              <li>Photocopie légalisée de la carte fiscale</li>
              <li>Photocopie légalisée de la carte d'identité nationale (CIN)</li>
              <li>Photo d'identité récente (04)</li>
              <li>Papier Chemise cartonné & pochette plastique</li>
            </ul>
            </p>
          </div>
  
          <div class="form col-12 col-lg-6 mb-4">
            <div class="container">
              <div class="flex justify-content-end">
                <button @click="$router.push('/marchand')" class="btn btn-primary col-2"><i class="bi bi-backspace"></i> Retour</button>
              </div>

              <form @submit="saveMarchand" class="was-validated">
                <div class="mb-3">
                  <label for="nom" class="form-label">Nom:</label>
                  <input type="text" v-model="marchand.nom" v-autofocus class="form-control" id="nom" placeholder="Entrer le nom" name="nom" required>
                  <div class="invalid-feedback">Remplissez le nom svp!</div>
                </div>
  
                <div class="mb-3">
                  <label for="prenoms" class="form-label">Prénoms:</label>
                  <input type="text" v-model="marchand.prenoms" class="form-control" id="prenoms" placeholder="Entrer le prénom" name="prenoms">
                  <div class="valid-feedback">Peut-être vide en cas d'absence</div>
                </div>
  
                <div class="row">
                  <div class="mb-3 col-12 col-sm-5">
                    <label for="datenaiss" class="form-label">Date de naissance:</label>
                    <input type="date" v-model="marchand.dateNaissance" class="form-control" id="datenaiss" name="datenaiss" required>
                    <div class="invalid-feedback">Remplissez la date de naissance svp!</div>
                  </div>
  
                  <div class="mb-3 col-12 col-sm-6">
                    <label for="lieunaiss" class="form-label">Lieu de naissance:</label>
                    <input type="text" v-model="marchand.lieuNaissance" class="form-control" id="lieunaiss" placeholder="Entrer le lieu de naissance"
                      name="lieunaiss" required>
                    <div class="invalid-feedback">Remplissez le lieu de naissance svp!</div>
                  </div>
  
  
                  <div class="mb-3 col-12">
                    <label for="cin" class="form-label">Numéro CIN:</label>
                    <input type="number" v-model="marchand.numCIN" class="form-control" id="cin" placeholder="Entrer le numéro CIN" name="cin"
                      max="999999999999" min="100000000000" required>
                    <div class="invalid-feedback">Verifiez le numéro CIN svp!</div>
                    <div style="color: red; font-size: smaller;" v-if="isCINExisted">Ce numéro existe déjà</div>
                  </div>
  
                  <div class="mb-3 col-12 col-sm-5">
                    <label for="datedelivrance" class="form-label">Date de délivrance:</label>
                    <input type="date" v-model="marchand.dateDelivrance" class="form-control" id="datedelivrance" name="datedelivrance" required>
                    <div class="invalid-feedback">Remplissez la date de délivrance svp!</div>
                  </div>
  
                  <div class="mb-3 col-12 col-sm-6">
                    <label for="lieudelivrance" class="form-label">Lieu de délivrance:</label>
                    <input type="text" v-model="marchand.lieuDelivrance" class="form-control" id="lieudelivrance" placeholder="Entrer le lieu de délivrance"
                      name="lieudelivrance" required>
                    <div class="invalid-feedback">Remplissez le lieu de délivrance svp!</div>
                  </div>
                </div>
  
                <div class="mb-3">
                  <label for="adresse" class="form-label">Adresse:</label>
                  <input type="text" v-model="marchand.adresse" class="form-control" id="adresse" placeholder="Entrer l'adresse" name="adresse"
                    required>
                  <div class="invalid-feedback">Remplissez l'adresse svp!</div>
                </div>
  
                <div class="mb-3">
                  <label for="contact" class="form-label">Contact:</label>
                  <input type="text" v-model="marchand.contact" class="form-control" id="contact" placeholder="Entrer le contact" name="contact"
                    required>
                  <div class="invalid-feedback">Remplissez le contact svp!</div>
                </div>

                <div class="btnGroup mb-1">
                  <input type="submit" :disabled="isCINExisted" class="btn btn-primary col-8" value="Valider">
                  <input class="btnAnnuler col-3 me-3 disabled" type="reset" value="Effacer">
                </div>
              </form>
            </div>
  
          </div>
        </div>
      </div>
    </div>

    <Teleport to="#modal" v-if="!isResponseEmpty">
      <ModalView @closeModal="closeModal">
        <template v-slot:nouveauMarchand>
          <div class="modal-body">
            <h1 class="d-flex col-12 justify-content-center p-4">
              <i class="bi bi-check-circle"></i>
            </h1>
            <h4>{{ marchandStore.error ? 'Echec de la requête' : 'Requête acceptée' }}</h4>
            <p class="text" :class="marchandStore.error ? 'fail' : 'succes'">
              {{ marchandStore.message }}
            </p>
            <button class="btn btn-success m-3" @click="closeModal">Okay</button>
          </div>
        </template>
      </ModalView>
    </Teleport>
  </template>
    
<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useMarchandStore } from '../../stores/marchandStore';
import { vAutofocus } from '../../directives/vAutoFocus';
import ModalView from '../ModalView.vue';


const marchand = reactive({
  numCIN: '',
  nom: '',
  prenoms: '',
  dateNaissance: '',
  lieuNaissance: '',
  dateDelivrance: '',
  lieuDelivrance: '',
  adresse: '',
  contact: ''
})

const marchandStore = useMarchandStore();

onMounted(()=>{
  marchandStore.selectMarchand()
})

const isResponseEmpty = ref(true)
const saveMarchand = (event)=>{
  event.preventDefault();
  marchandStore.addMarchand(marchand.numCIN, marchand.nom, marchand.prenoms, marchand.dateNaissance, marchand.lieuNaissance, marchand.dateDelivrance, marchand.lieuDelivrance, marchand.contact, marchand.adresse);
  
    setTimeout(()=>{
      isResponseEmpty.value = false
    }, 200)
}

const closeModal = ()=>{
  isResponseEmpty.value = true
  marchand.adresse = ''
  marchand.contact = ''
  marchand.dateDelivrance = ''
  marchand.dateNaissance = ''
  marchand.lieuDelivrance = ''
  marchand.lieuNaissance = ''
  marchand.nom = ''
  marchand.numCIN = ''
  marchand.prenoms = ''
}

const isCINExisted = ref(false)
watch(()=> marchand.numCIN, (newNum, oldNum)=>{
  isCINExisted.value = marchandStore.getCIN.includes(newNum.toString())
  // console.log(marchandStore.getCIN);
})

</script>
    
<style scoped>
.succes{
  color: green;
}

.fail{
  color: red;
}
.btnGroup{
    display: flex;
    justify-content: space-between;
  }

  .form {
    background-color: white;
    border: none;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.15), 0 8px 8px 0 rgba(255, 255, 255, 0.25);
  }
  
  .row {
    display: flex;
    justify-content: space-between;
  }
  
  @media screen and (min-width: 1020px){
    .row{
      position: relative;
    }
  
    .fixe{
      position: sticky;
      top: 100px ;
    }
  }

  @media screen and (min-width: 990px){
    .row{
      position: relative;
    }

    .form{
      max-height: 550px;
    }
    .form > .container{
      overflow-y: scroll;
    }
  }
  </style>