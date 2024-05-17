<template>
  <div class="loginPage center row">
    <div class="col-lg-4 col-md-5 col-sm-10 col-10 image">
      <img src="../assets/image/Logo capitale economique.png" class="col-9">
      <hr>
      <p class="text">NB: Veuillez parler au responsable au cas où vous oubliez votre mots de passe</p>
    </div>
    <div class="col-lg-4 col-md-5 col-sm-8 col-10">
      <form @submit="enregistrerLogIn" class="form was-validated">
        <h2>Login</h2>
        <div class="mb-3 mt-3">
          <label for="uname" class="form-label">Identification:</label>
          <input type="text" class="form-control" id="uname" placeholder="Enter votre numéro d'identification"
            name="uname" required v-autofocus>
          <div class="invalid-feedback">*Veuillez remplir votre numéro d'identification</div>
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">Mots de passe:</label>
          <input type="password" class="form-control" id="pwd" placeholder="Entrer votre mots de passe" name="pswd"
            minlength="5" required>
          <div class="invalid-feedback">*Verifez votre mots de passe</div>
        </div>
        <div class="btnLogIn">
          <input type="submit" class="btn btn-primary btnLogIn" value="Se connecter">
          <button class="btnAnnuler" @click="$emit('close')">Annuler</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
/*
  Router
*/
import { useRouter } from 'vue-router'
const router = useRouter()

/*
  Emit
*/
const emit = defineEmits('connection', 'close')

const enregistrerLogIn = (event)=>{
  event.preventDefault();
  emit('connection')
  localStorage.setItem("loggedIn", "true")
  loggedIn.value = localStorage.getItem("loggedIn")
  router.push('/marchand')
}

import { vAutofocus } from '../directives/vAutoFocus';

import { inject } from 'vue'
const loggedIn = inject('loggedIn')

</script>

<style>
.loginPage {
  z-index: 5;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
}

.btnLogIn{
  display: flex;
  justify-content: center;
  flex: 1 1 0;
}

.btnAnnuler{
  border: none;
  /* border: 1px solid gray; */
  border-radius: 5px;
  margin-left: 2%;
  color: blue;
}

.btnAnnuler:hover{
  color: var(--bs-danger);
  outline: 1px solid var(--bs-danger);
  /* border: 1px solid var(--bs-danger); */
}

h2 {
  text-align: center;
}

.form {
  display: grid;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(13, 110, 253);
  box-shadow: 0 4px 8px 0 rgba(13, 110, 253, 0.4), 0 6px 20px 0 rgba(13, 110, 253, 0.3);
}

.center {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  display: grid;
  align-content: center;
}

.invalid-feedback {
  color: var(--bs-danger);
  font-size: x-small;
}
</style>
