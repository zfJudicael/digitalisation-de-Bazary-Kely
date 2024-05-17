<template>
  <div class="content">
    <div class="container">
      <div class="d-flex justify-content-start">
        <h1><i class="bi bi-person-circle"></i></h1>
        <h3 style="margin-left: 10px;">Percepteur</h3>
      </div>
      <h6 v-for="marche in marcheStore.getNomMarche(route.params.codeMarche)">Marché: {{ `${marche.nomMarche}(${marche.codeMarche})` }}</h6>
      <h6>Nombre total de percepteur : {{ percepteurStore.getPercepteurByCodeMarche(route.params.codeMarche).length }}</h6>
      <h6>Nombre de places non suivies : {{ placeStore.getPlacesNonSuiviesByCodeMarche(route.params.codeMarche).length }}</h6>
      <br>

      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-primary col-4 col-sm-3 col-md-2" @click="$router.push({ name: 'marche'})"><i class="bi bi-backspace"></i> Retour</button>
      </div>

      <div class="col-12 mt-4 table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr class="table-primary">
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénoms</th>
              <th>Contact</th>
              <th>Adresse</th>
              <th>Nombre de places occupées</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="percepteur in percepteurStore.getPercepteurByCodeMarche(route.params.codeMarche)">
              <td>{{ percepteur.matriculePercep }}</td>
              <td>{{ percepteur.nomPercep }}</td>
              <td>{{ percepteur.prenomsPercep }}</td>
              <td>{{ percepteur.telPercep }}</td>
              <td>{{ percepteur.adressePercep }}</td>
              <td>
                {{ occupationStore.getPlaceByMatriPercep(percepteur.matriculePercep).length }}<br>
                <button class="badge bg-success" @click="$router.push({name: 'placeOccuper', params:{ matricule: percepteur.matriculePercep }})">Détails</button>
              </td>
              <td style="color: var(--bs-primary); font-size: 18px;">
                <RouterLink :to="{name: 'modificationPercepteur', params: { matricule: percepteur.matriculePercep }}">
                  <i class="bi bi-pencil-square"></i>
                </RouterLink>
              </td>
              <td style="color: var(--bs-danger); font-size: 18px;">
                <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="selectedMatricule = percepteur.matriculePercep">
                  <i class="bi bi-trash3-fill"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td @click="router.push({ name: 'nouveauPercepteur'})" colspan="8" style="cursor: pointer; color: blue; text-align: center;">+Ajouter </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Delete>
        <template v-slot:deletePercepteur>
          <!-- Modal body -->
          <div v-if="isResponseEmpty" class="modal-body">
            Suppression de la Percepteur : {{ selectedMatricule }} 
          </div>

          <div v-else class="modal-body">
            <h1 class="d-flex col-12 justify-content-center p-4">
              <i class="bi bi-check-circle"></i>
            </h1>
            <h4>{{ percepteurStore.error ? 'Echec de la requête' : 'Requête acceptée' }}</h4>
            <p class="text" :class="percepteurStore.error ? 'fail' : 'succes'">
              {{ percepteurStore.message }}
            </p>

            <button class="btn btn-success m-3" data-bs-dismiss="modal" @click="isResponseEmpty = true">Okay</button>
          </div>

          <div v-if="isResponseEmpty" class="mb-3">
            <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
            <button class="btn btn-danger" @click="deletePercepteur">Supprimer</button>
          </div>
        </template>
    </Delete>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Delete from '../components/DeleteModal.vue';
import { ref, onMounted } from 'vue';
import { usePercepteurStore } from '../stores/percepteurStore';
import { useRoute, useRouter } from 'vue-router';
import { useOccupationStore } from '../stores/occupationStore';
import { usePlaceStore } from '../stores/placeStore';
import { useMarcheStore } from '../stores/marcheStore';

const selectedMatricule = ref('')

const route = useRoute();
const router = useRouter();

const percepteurStore = usePercepteurStore()
const occupationStore = useOccupationStore()
const placeStore = usePlaceStore()
const marcheStore = useMarcheStore()
onMounted(()=>{
  percepteurStore.selectPercepteur()
  occupationStore.selectPlaceOccupe()
  placeStore.selectPlace()
  marcheStore.selectMarche()
})

const isResponseEmpty = ref(true)
const deletePercepteur = (event)=>{
  event.preventDefault()

  percepteurStore.deletePercepteur(selectedMatricule.value)

  setTimeout(()=>{
    isResponseEmpty.value = false;
  }, 300)
}

</script>

<style scoped>
.container .d-flex{
  align-items: center;
}
.btnAnnuler{
  background-color: var(--bs-gray-300);
}
.btnAnnuler:hover{
  background: white;
  outline: 1px solid var(--bs-primary);
  color: var(--bs-primary);
}
</style>