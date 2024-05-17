<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <h1>Marchands</h1>
        <div class="col-md-6">
          <p class="text">Ce sont les marchands qui louent les places dans des différents arrondissements de la Commune
            Urbaine de Toamasina.</p>
        </div>

        <div class="col-md-6 mb-2">
          <form class="d-flex">
            <input v-model="cinToFind" class="form-control me-2" type="text" placeholder="Entrer le numéro CIN">
            <button class="btn btn-primary" type="button">Rechercher</button>
          </form>
        </div>
        <div class="flex justify-content-end">
          <button class="btn btn-primary" @click="$router.push({ name: 'nouveauMarchand' })">
            {{ 'Ajouter >' }}
          </button>
        </div>

        <div v-if="marchandStore.loading" class="loading">Loading data..</div>

        <div v-else class="col-12 mt-4 table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr class="table-primary">
                <th>CIN</th>
                <th>Nom</th>
                <th>Prénoms</th>
                <th>Date de naissance</th>
                <th>Lieu de naissance</th>
                <th>Date de délivrance</th>
                <th>Lieu de délivrance</th>
                <th>Contact</th>
                <th>Adresse</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for=" marchand in marchandStore.getByCIN(cinToFind)">
                <td>{{ marchand.cin }}</td>
                <td>{{ marchand.nom }}</td>
                <td>{{ marchand.prenom }}</td>
                <td>{{ marchand.datenaiss }}</td>
                <td>{{ marchand.lieunaiss }}</td>
                <td>{{ marchand.datedelivr }}</td>
                <td>{{ marchand.lieudelivr }}</td>
                <td>{{ marchand.tel }}</td>
                <td>{{ marchand.adresse }}</td>

                <td style="color: var(--bs-primary); font-size: 18px;">
                  <RouterLink :to="{
                    name: 'modificationMarchand', params: { cin: marchand.cin },
                    query: {
                      nom: marchand.nom,
                      prenom: marchand.prenom,
                      datenaiss: marchand.datenaiss,
                      lieunaiss: marchand.lieunaiss,
                      datedelivr: marchand.datedelivr,
                      lieudelivr: marchand.lieudelivr,
                      tel: marchand.tel,
                      adresse: marchand.adresse
                    }
                  }">
                    <i class="bi bi-pencil-square"></i>
                  </RouterLink>
                </td>
                <td style="color: var(--bs-danger); font-size: 18px;">
                  <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="cinToDelete = marchand.cin">
                    <i class="bi bi-trash3-fill"></i>
                  </a>
                </td>
              </tr>
            
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
  <DeleteModal>
    <template v-slot:deleteMarchand>
      <!-- Modal body -->
      <div v-if="isResponseEmpty" class="modal-body">
        Suppression de Marchand CIN : {{ cinToDelete }}
      </div>

      <div v-else class="modal-body">
        <h1 class="d-flex col-12 justify-content-center p-4">
          <i class="bi bi-check-circle"></i>
        </h1>
        <h4>{{ marchandStore.error ? 'Echec de la requête' : 'Requête acceptée' }}</h4>
        <p class="text" :class="marchandStore.error ? 'fail' : 'succes'">
          {{ marchandStore.message }}
        </p>

        <button class="btn btn-success m-3" data-bs-dismiss="modal">Okay</button>
      </div>

      <div v-if="isResponseEmpty" class="mb-3">
        <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
        <button class="btn btn-danger" @click="deleteMarchand">Supprimer</button>
      </div>
    </template>
  </DeleteModal>

</template>

<script setup>
import { onMounted } from 'vue'
import { useMarchandStore } from '../stores/marchandStore';
import DeleteModal from '../components/DeleteModal.vue';
import { ref } from 'vue';

const cinToFind = ref('')

const marchandStore = useMarchandStore();
onMounted(() => {
  setTimeout(() => {
    marchandStore.selectMarchand()
  }, 1000)
})

// Delete
const cinToDelete = ref('')
const deleteMarchand = () => {
  marchandStore.deleteMarchand(cinToDelete.value)

  setTimeout(()=>{
    isResponseEmpty.value = false
  }, 300)
}

const isResponseEmpty = ref(true)

</script>

<style scoped>
.loading {
  margin-top: 40px;
  padding: 20px;
  background-color: lightgreen;
  text-align: center;
}

.btnAnnuler {
  background-color: var(--bs-gray-300);
}

.btnAnnuler:hover {
  background-color: white;
  outline: 1px solid var(--bs-primary);
  color: var(--bs-primary);
}

.flex {
  display: flex;
}

table {
  text-align: center;
}

.succes{
  color: green;
}

.fail{
  color: red;
}
</style>