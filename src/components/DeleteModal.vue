<template>
    <!-- The Modal -->
    <div class="modal fade" id="deleteModale">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
  
          <!-- Modal Header -->
          <div class="modal-header">
            <h2 class="d-flex col-12 justify-content-center">
              <i class="bi bi-trash3-fill"></i>
            </h2>
          </div>
                      
          <slot name="deleteMarchand"></slot>
          <slot name="deleteCategorie"></slot>  
          <slot name="deleteACtivite"></slot>
          <slot name="deleteMarche"></slot>
          <slot name="deletePlace"></slot>
          <slot name="deletePercepteur"></slot>
          <slot name="retirerPlace"></slot>
          <slot name="deleteContrat"></slot>

        </div>
      </div>
        
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .modal-dialog{
    text-align: center;
    position: relative;
  }
  .modal-header{
    background-color: var(--bs-danger);
    color: white;
  }
  
  .btn-close{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  </style>