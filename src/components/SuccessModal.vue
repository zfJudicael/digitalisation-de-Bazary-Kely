<template>
  <!-- The Modal -->
  <div class="modal fade" id="successModal">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal Header -->
        <!-- <div class="modal-header pt-4">
          
        </div> -->

        <!-- Modal Body -->
        <div class="modal-body">
          <h1 class="d-flex col-12 justify-content-center p-4">
            <i class="bi bi-check-circle"></i>
          </h1>
          <h4>Done</h4>
          <p class="text">
            Your request successfully send.
          </p>
          
          <button class="btn btn-success m-3" data-bs-dismiss="modal">DONE</button>
          <a class="btnClose" data-bs-dismiss="modal"><i class="bi bi-x-circle-fill"></i></a>
        </div>
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

.modal-body h1{
  color: var(--bs-success);
  font-size: 60px;
}

.modal-body{
  text-align: center;
  color: black;
}
.btn{
  padding: 5px 20px;
}
.btnClose{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>