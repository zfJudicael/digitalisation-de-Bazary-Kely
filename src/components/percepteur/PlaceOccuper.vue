<template>
    <div class="content">
      <div class="container">
        <div class="d-flex justify-content-end mb-4">
          <button class="btn btn-primary col-4 col-sm-3 col-md-2" @click="$router.push({ name: 'percepteur'})"><i class="bi bi-backspace"></i> Retour</button>
        </div>
        <h6>Voici la liste des places occupées par {{ `${ route.params.matricule } : ${nomPercep} ${prenomsPercep}` }} </h6>
  
        <div class="col-12 mt-4 table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr class="table-primary">
                <th>Numéro</th>
                <th>Lot</th>
                <th>Date début</th>
                <th></th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="place in occupationStore.getPlaceByMatriPercep(route.params.matricule)">
                <td>{{ place.numPlace }}</td>
                <td v-if="placeStore.getPlaceByNumPlace(place.numPlace).length > 0">
                  <p id="lotPlace" v-for="place2 in placeStore.getPlaceByNumPlace(place.numPlace)">{{ place2.lotPlace }}</p>
                </td>
                <td v-else> - </td>
                <td>{{ place.dateDeb }}</td>
                <td style="color: var(--bs-danger); font-size: 18px;">
                  <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="openModif(place.numPlace)">
                    <i class="bi bi-trash3-fill"></i>
                  </a>
                </td>
  
              </tr>
              <tr>
                <td @click="$router.push({ name: 'nouveauOccupation'})" colspan="4" style="cursor: pointer; color: blue; text-align: center;">+Ajouter </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  
    <DeleteModal>
      <template v-slot:retirerPlace>
        <!-- Modal body -->
        <div v-if="isResponseEmpty" class="modal-body">
          Retirer la place numéro : {{ selectedNumPlace }} (Lot : {{ selectedLotPlace }}) de la liste?
        </div>
  
        <div v-else class="modal-body">
          <h1 class="d-flex col-12 justify-content-center p-4">
            <i class="bi bi-check-circle"></i>
          </h1>
          <h4>{{ placeStore.error ? 'Echec de la requête' : 'Requête acceptée' }}</h4>
          <p class="text" :class="placeStore.error ? 'fail' : 'succes'">
            {{ placeStore.message }}
          </p>
  
          <button class="btn btn-success m-3" data-bs-dismiss="modal" @click="isResponseEmpty = true">Okay</button>
        </div>
  
        <div v-if="isResponseEmpty" class="mb-3">
          <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-danger" @click="removePlace">Supprimer</button>
        </div>
      </template>
    </DeleteModal>
    
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { usePlaceStore } from '../../stores/placeStore';
  import { usePercepteurStore } from '../../stores/percepteurStore';
  import { useRoute, useRouter } from 'vue-router';
  import DeleteModal from '../DeleteModal.vue';
  import { useOccupationStore } from '../../stores/occupationStore';
  
  const route = useRoute()
  const router = useRouter()
  const placeStore = usePlaceStore()
  const percepteurStore = usePercepteurStore()
  const occupationStore = useOccupationStore()
  
  
  const selectedNumPlace = ref('')
  const selectedLotPlace = ref('')
  const nomPercep = ref('')
  const prenomsPercep = ref('')

  onMounted(()=>{
    placeStore.selectPlace()
    percepteurStore.selectPercepteur()
    occupationStore.selectOccuper()
    occupationStore.selectPlaceOccupe()

    setTimeout(()=>{
      nomPercep.value = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].nomPercep
      prenomsPercep.value = percepteurStore.getPercepteurByMatricule(route.params.matricule)[0].prenomsPercep
    }, 300)
  })

  const openModif = (numPlace)=>{
    selectedNumPlace.value = numPlace
    selectedLotPlace.value = document.getElementById('lotPlace').innerText
  }
  
  const isResponseEmpty = ref(true)
  const removePlace = (event)=>{
    event.preventDefault()
  
    occupationStore.updatePlace(route.params.matricule, selectedNumPlace.value)
    setTimeout(()=>{
      isResponseEmpty.value = false;
      occupationStore.selectPlaceOccupe();
    }, 300)
  }
  </script>
  
  <style scoped>
  .container .d-flex{
    align-items: center;
  }
  </style>