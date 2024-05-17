<template>
    <!-- The Modal -->
    <div class="modal fade" id="addArrodissement">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
  
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="d-flex col-12 justify-content-center">
               Ajout d'arrondissement
            </h4>
          </div>
                      
          <!-- Modal body -->
          <div class="modal-body pt-4">
            <form class="was-validated">
                  <div class="mb-3">
                    <label class="form-label">Nom :</label>
                    <input v-model="nomArrond" type="text" class="form-control" required>
                    <div class="invalid-feedback">Remplissez bien le champ svp!</div>
                  </div>

                  <div class="div-btn mb-3">
                    <input type="submit" data-bs-dismiss="modal" :disabled="isEmpty" class="btn btn-primary col-3" value="Valider" @click="add">
                    <button class="btn btnAnnuler me-2" data-bs-dismiss="modal" @click="(event)=>{
                      event.preventDefault()
                      nomArrond = ''
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
  const nomArrond = ref('')
  const isEmpty = ref(true)
  
  const add = (event)=>{
    event.preventDefault()
    
    if(nomArrond.value.length > 0){
        arrondissementStore.addArrondissement(nomArrond.value)
    }
    nomArrond.value = ''
  }

  watch(nomArrond, (newN, oldN)=>{
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