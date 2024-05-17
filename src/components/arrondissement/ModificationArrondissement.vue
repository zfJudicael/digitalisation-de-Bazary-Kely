<template>
    <!-- The Modal -->
    <div class="modal fade" id="updateArrodissement">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
  
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="d-flex col-12 justify-content-center">
               Modification d'arrondissement
            </h4>
          </div>
                      
          <!-- Modal body -->
          <div class="modal-body pt-4">
            <form class="was-validated">
                  <div class="mb-3">
                    <label class="form-label">Nom actuel :</label>
                    <input :value="props.nomArrond" type="text" class="form-control" readonly  required>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Nouveau nom :</label>
                    <input v-model="newNomArrond" type="text" class="form-control" required>
                    <div class="invalid-feedback">Remplissez bien le champ svp!</div>
                  </div>

                  <div class="div-btn mb-3">
                    <input type="submit" data-bs-dismiss="modal" :disabled="isEmpty" class="btn btn-primary col-3" value="Valider" @click="saveChange">
                    <button class="btn btnAnnuler me-2" data-bs-dismiss="modal" @click="(event)=>{
                      event.preventDefault()
                      newNomArrond = ''
                      }">Annuler</button>
                  </div>  
            </form>
          </div>
        
        </div>
      </div>
        
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useArrondissementStore } from '../../stores/arrondissementStore';  

  const arrondissementStore = useArrondissementStore()

  const props = defineProps({
    nomArrond: String,
  })
  const newNomArrond = ref('')
  const isEmpty = ref(true)
  
  const saveChange = (event)=>{
    event.preventDefault()
    
    if(newNomArrond.value.length > 0){
        arrondissementStore.updateArrondissement(props.nomArrond, newNomArrond.value)
    }
    newNomArrond.value = ''
  }

  watch(newNomArrond, (newN, oldN)=>{
    isEmpty.value = newN.length == 0 
  })
  
  </script>
  
  <style scoped>
  #ModifCategResponse{
    text-align: center;
  }
  .succes{
    color: green;
  }
  
  .fail{
    color: red;
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
    outline: 1px solidCateg var(--bs-danger);
    color: var(--bs-danger);
  }
  .div-btn{
    text-align: center;
  }
  </style>