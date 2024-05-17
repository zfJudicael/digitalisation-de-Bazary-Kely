<template>
  <div class="content">
    <div class="container">
      <div class="d-flex justify-content-start">
        <h1><i class="bi bi-shop-window"></i></h1>
        <h3 style="margin-left: 10px;">Places</h3>
      </div>
      <h6 v-for="marche in marcheStore.getNomMarche(route.params.codeMarche)">Marché: {{ `${marche.nomMarche}(${marche.codeMarche})`}}</h6>
      <h6>Total places: {{ placeStore.getPlaceByCodeMarche(route.params.codeMarche).length }}</h6>
      <h6>Nombre de places non suivies : {{ placeStore.getPlacesNonSuiviesByCodeMarche(route.params.codeMarche).length }}</h6>
      <br>

      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-primary col-4 col-sm-3 col-md-2" @click="$router.push({ name: 'marche'})"><i class="bi bi-backspace"></i> Retour</button>
      </div>
      
      <!-- <select id="liste" name="liste" class="form-select">
        <option value="tous" selected>Tous</option>
        <option value="dispo">Disponible</option>
      </select> -->

      <div class="col-12 mt-4 table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr class="table-primary">
              <th>Numéro</th>
              <th>Lot</th>
              <!-- <th>Activité</th> -->
              <!-- <th>Percepteur</th> -->
              <!-- <th>Lot</th> -->
              <th></th>
              <th></th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="place in placeStore.getPlaceByCodeMarche(route.params.codeMarche)">
              <td>{{ place.numPlace }}</td>
              <td>{{ place.lotPlace }}</td>
              <!-- <td>Friperie</td> -->
              <!-- <td>2450</td> -->
              <!-- <td>02 Y 1108</td> -->
              <td style="color: var(--bs-primary); font-size: 18px;">
                <a data-bs-toggle="modal" data-bs-target="#modifPlace" @click="()=>{
                  selectedNumPlace = place.numPlace
                  selectedLotPlace = place.lotPlace
                }">
                  <i class="bi bi-pencil-square"></i>
                </a>
              </td>
              <td style="color: var(--bs-danger); font-size: 18px;">
                <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="()=>{
                  selectedNumPlace = place.numPlace
                  selectedLotPlace = place.lotPlace
                }">
                  <i class="bi bi-trash3-fill"></i>
                </a>
              </td>

            </tr>
            <tr>
              <td @click="$router.push({ name: 'nouveauPlace'})" colspan="4" style="cursor: pointer; color: blue; text-align: center;">+Ajouter </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
  <ModificationPlace :numPlace="selectedNumPlace" :lotPlace="selectedLotPlace"/>

  <DeleteModal>
    <template v-slot:deletePlace>
      <!-- Modal body -->
      <div v-if="isResponseEmpty" class="modal-body">
        Suppression de la place numéro : {{ selectedNumPlace }} (Lot : {{ selectedLotPlace }})
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
        <button class="btn btn-danger" @click="deletePlace">Supprimer</button>
      </div>
    </template>
  </DeleteModal>
  
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { usePlaceStore } from '../stores/placeStore';
import { useRoute, useRouter } from 'vue-router';
import ModificationPlace from '../components/place/ModificationPlace.vue';
import DeleteModal from '../components/DeleteModal.vue';
import { useMarcheStore } from '../stores/marcheStore';

const route = useRoute()
const router = useRouter()
const placeStore = usePlaceStore()
const marcheStore = useMarcheStore()

const selectedNumPlace = ref('')
const selectedLotPlace = ref('')
onMounted(()=>{
  placeStore.selectPlace()
  marcheStore.selectMarche()
})

const isResponseEmpty = ref(true)
const deletePlace = (event)=>{
  event.preventDefault()

  placeStore.deleteMarche(selectedNumPlace.value, selectedLotPlace.value);
  setTimeout(()=>{
    isResponseEmpty.value = false;
  }, 300)
}
</script>

<style scoped>
.container .d-flex{
  align-items: center;
}
</style>