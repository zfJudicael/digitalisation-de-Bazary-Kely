<template>
  <!-- The Modal -->
  <div class="modal fade" id="modifPlace">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="d-flex col-12 justify-content-center">
             Modification de la place numéro : {{ props.numPlace }}
          </h4>
        </div>
                    
        <!-- Modal body -->
        <div class="modal-body pt-4">
          <form v-if="isResponseEmpty" @submit="saveChange">

                <div class="mb-3">
                  <label class="form-label">Nouveau numéro (*Peut être laisser vide) :</label>
                  <input v-model="place.numPlace" ref="numPlaceRef" type="number" class="form-control">
                  <p v-if="isNumPlaceExisted" class="error">Ce numéro existe déjà</p>
                </div>

                <div class="mb-3">
                  <label class="form-label">Lot actuel :</label>
                  <input type="text" :value="props.lotPlace" class="form-control" readonly>
                </div>

                <div class="mb-3">
                  <label class="form-label">Nouveau lot :</label>
                  <input v-model="place.lotPlace" ref="lotPlaceRef" type="text" class="form-control" placeholder="Réécriver le lot actuel en cas de non rénouvelement" required>
                  <p v-if="isLotPlaceExisted" class="error">Ce lot existe déjà</p>
                </div>

                
            <div class="div-btn mb-3">
              <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
              <input type="submit" class="btn btn-primary col-3" value="Valider">
            </div> 
          </form>

          <div v-else>
            <div style="text-align: center;">
              <p v-if="placeStore.error" style="color: red; font-size: large;">{{ placeStore.message }}</p>
              <p v-else style="color: green; font-size: large;">{{ placeStore.message }}</p>
            </div>
            <div class="div-btn mb-3">
              <!-- <button class="btn btnAnnuler me-2" data-bs-dismiss="modal" class="btn btn-primary col-3">Annuler</button> -->
              <input  class="btn btnAnnuler me-2" data-bs-dismiss="modal" value="Okay" @click="()=>{
                isResponseEmpty = true
                place.numPlace = ''            
                place.lotPlace = ''
              }">
            </div> 
          </div>
        </div>       
      </div>
    </div>
    
      
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { usePlaceStore } from '../../stores/placeStore';

const placeStore = usePlaceStore()
const props = defineProps({
  numPlace: String,
  lotPlace: String
})

const place = reactive({
  numPlace: '',
  lotPlace: ''
})

const isNumPlaceExisted = ref(false)
watch(()=> place.numPlace, (newNumPlace, oldNumPlace)=>{
  isNumPlaceExisted.value = placeStore.getNumPlace.includes(newNumPlace.toString())
})

const isLotPlaceExisted = ref(false)
watch(()=> place.lotPlace, (newLotPlace, oldLotPlace)=>{
  isLotPlaceExisted.value = placeStore.getLotPlace.includes(newLotPlace)
  if(newLotPlace === props.lotPlace) isLotPlaceExisted.value = false;
})

const lotPlaceRef = ref(null)
const numPlaceRef = ref(null)
const isResponseEmpty = ref(true)

const saveChange = (event)=>{
  event.preventDefault()

  if(isNumPlaceExisted.value){
    numPlaceRef.value.focus()
  }else{
    if(isLotPlaceExisted.value){
      lotPlaceRef.value.focus()
    }else{
      placeStore.updatePlace(props.numPlace, place.numPlace, props.lotPlace, place.lotPlace);
      setTimeout(()=>{
          isResponseEmpty.value = false;
          if(!placeStore.error){
            place.numPlace = ''            
            place.lotPlace = ''
          }
      }, 300)
    }
  }  
}

</script>

<style scoped>
.error{
  color: red;
  font-size: smaller;
}
.modal-header{
  background-color: var(--bs-primary);
  color: white;
}

.btn-close{
  position: absolute;
  top: 10px;
  right: 10px;
}

.btnAnnuler{
  background-color: var(--bs-gray-300);
}
.btnAnnuler:hover{
  outline: 1px solid var(--bs-danger);
  color: var(--bs-danger);
}
.div-btn{
  text-align: center;
}
</style>