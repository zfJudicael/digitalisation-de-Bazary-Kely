<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <h1><i class="bi bi-bookmark-plus-fill"></i> Modification de marchand</h1>

        <form class="was-validated form1" @submit="saveChange">

          <div class="mb-3 col-sm-6">
            <label for="cin" class="form-label">Numéro CIN:</label>
            <input v-model="marchand.numCIN" type="number" class="form-control" id="cin" name="cin" required max="999999999999" min="100000000000">
            <div v-if="isCINExisted" style="color: red; font-size: smaller;">Ce CIN existe déjà</div>
          </div>

          <div class="row">
            <div class="mb-3 col-sm-6">
              <label for="nom" class="form-label">Nom:</label>
              <input v-model="marchand.nom" type="text" class="form-control" id="nom" placeholder="Entrer le nom"
                name="nom" required>
            </div>

            <div class="mb-3 col-sm-6">
              <label for="prenoms" class="form-label">Prénoms:</label>
              <input v-model="marchand.prenoms" type="text" class="form-control" id="prenoms"
                placeholder="Entrer le prénom" name="prenoms">
            </div>

            <div class="mb-3 col-12 col-sm-6 col-lg-3">
              <label for="datenaiss" class="form-label">Date de naissance:</label>
              <input v-model="marchand.dateNaissance" type="date" class="form-control" id="datenaiss" name="datenaiss"
                required>
              <div class="invalid-feedback">Remplissez la date de naissance svp!</div>
            </div>

            <div class="mb-3 col-12 col-sm-6 col-lg-3">
              <label for="lieunaiss" class="form-label">Lieu de naissance:</label>
              <input type="text" v-model="marchand.lieuNaissance" class="form-control" id="lieunaiss"
                placeholder="Entrer le lieu de naissance" name="lieunaiss" required>
              <div class="invalid-feedback">Remplissez le lieu de naissance svp!</div>
            </div>

            <div class="mb-3 col-12 col-sm-6 col-lg-3">
              <label for="datedelivrance" class="form-label">Date de délivrance:</label>
              <input type="date" v-model="marchand.dateDelivrance" class="form-control" id="datedelivrance"
                name="datedelivrance" required>
              <div class="invalid-feedback">Remplissez la date de délivrance svp!</div>
            </div>

            <div class="mb-3 col-12 col-sm-6 col-lg-3">
              <label for="lieudelivrance" class="form-label">Lieu de délivrance:</label>
              <input type="text" v-model="marchand.lieuDelivrance" class="form-control" id="lieudelivrance"
                placeholder="Entrer le lieu de délivrance" name="lieudelivrance" required>
              <div class="invalid-feedback">Remplissez le lieu de délivrance svp!</div>
            </div>

            <div class="mb-3 col-sm-6">
              <label for="adresse" class="form-label">Adresse:</label>
              <input type="text" v-model="marchand.adresse" class="form-control" id="adresse"
                placeholder="Entrer l'adresse" name="adresse" required>
              <div class="invalid-feedback">Remplissez l'adresse svp!</div>
            </div>

            <div class="mb-3 col-sm-6">
              <label for="contact" class="form-label">Contact:</label>
              <input type="text" v-model="marchand.contact" class="form-control" id="contact"
                placeholder="Entrer le contact" name="contact" required>
              <div class="invalid-feedback">Remplissez le contact svp!</div>
            </div>

            <div class="btnGroup col-12 mb-4 mt-4">
              <input type="submit" :disabled="isCINExisted" class="btn btn-primary col-4 col-sm-4 col-lg-3" value="Valider">
              <button class="btn btnAnnuler col-4 col-sm-3 col-lg-2 me-2"
                @click="$router.push('/marchand')">Annuler</button>
            </div>


          </div>
        </form>
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
import { useRouter, useRoute } from 'vue-router'
import { useMarchandStore } from '../../stores/marchandStore';
import { onMounted, reactive, ref, watch } from 'vue'
import ModalView from '../ModalView.vue';

const router = useRouter();
const route = useRoute()
const marchandStore = useMarchandStore();

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

const oldCin = ref('');

onMounted(() => {
  marchandStore.selectMarchand()
  oldCin.value = route.params.cin
  marchand.numCIN = route.params.cin,
    marchand.nom = route.query.nom,
    marchand.prenoms = route.query.prenom,
    marchand.dateNaissance = route.query.datenaiss,
    marchand.lieuNaissance = route.query.lieunaiss,
    marchand.dateDelivrance = route.query.datedelivr,
    marchand.lieuDelivrance = route.query.lieudelivr,
    marchand.adresse = route.query.adresse,
    marchand.contact = route.query.tel
})

const isResponseEmpty = ref(true)
const saveChange = (event) => {
  event.preventDefault()
  marchandStore.updateMarchand(route.params.cin, marchand.numCIN, marchand.nom, marchand.prenoms, marchand.dateNaissance, marchand.lieuNaissance, marchand.dateDelivrance, marchand.lieuDelivrance, marchand.contact, marchand.adresse)

  setTimeout(() => {
    isResponseEmpty.value = false
  }, 200)
}

const closeModal = ()=>{
  isResponseEmpty.value = true
  if(!marchandStore.error) {
    router.push('/marchand')
  }
}

const isCINExisted = ref(false)
watch(()=> marchand.numCIN, (newCIN, oldCIN)=>{
  isCINExisted.value = marchandStore.getCIN.includes(newCIN.toString())
  if(newCIN == route.params.cin) {
    isCINExisted.value = false
  }
})

</script>
  
<style scoped>
.btnGroup {
  display: flex;
  justify-content: center;
}

.btnAnnuler {
  background-color: var(--bs-gray-300);
}

.btnAnnuler:hover {
  outline: 1px solid var(--bs-primary);
  color: var(--bs-primary);
}
</style>