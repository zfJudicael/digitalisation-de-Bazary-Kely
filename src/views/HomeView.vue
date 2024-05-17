<template>
  <div class="home">
    <h1 id="typeWriter">{{ textToShow }}</h1>

    <img src="../assets/image/Logo Toamasina.png" alt="Logo Toamasina" class="logoToamasina">
    <img src="../assets/image/Logo capitale economique.png" alt="Logo Capitale economique" class="logoCapitalEco">
    <div class="rote">
      <div></div>
      <div></div>
      <div></div>
    </div>
    
    <button class="btnConnexion" @click="toggleShowLogin">S'identifier</button> 

    <Teleport to="#modal" v-if="showLogin">
      <LoginView @close="toggleShowLogin" @connection="toggleLoggedIn"></LoginView>
    </Teleport>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTypeWriter } from '../use/useTypeWriter';
import LoginView from '../components/LoginView.vue';

/*
  TypeWriter
*/ 
const text = "Digitalisation de Bazary Kely";
const { textToShow, type } = useTypeWriter();

onMounted(()=>{
  type(text);
})

const showLogin = ref(false);

const toggleShowLogin = ()=>{
  showLogin.value = !showLogin.value
}

</script>

<style>

.home{
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  position: relative;
}

/* #accue */

.logoCapitalEco{
  position: absolute;
  top: 10px;
  left: 20px;
  width: 200px;
}

.logoToamasina {
  position: absolute;
  top: 10px;
  right: 20px;
  width: 80px;
}

#typeWriter{
  position: absolute;
  top: 30%;
  left: 5%;
  width: 400px;
  border-left: 5px solid #212529;
  padding: 20px;
  min-height: 90px;
  z-index: 4;
}

.rote{
  scroll-margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  margin: 20% 5% 0 0;
  transform: rotate(45deg);
}

.rote div{
  display: inline-block;
  border-radius: 5%;
  margin: 5% 0 0 5%;
  width: 200px;
  height: 200px;
  outline: 3px solid #048a2e;
  outline-offset: 3px;
}

.btnConnexion{
  cursor: pointer;
  position: absolute;
  bottom: 0;
  margin: 0 auto 10% 10%;
  border: none;
  color: white;
  background-color: rgb(0, 153, 255);
  font-size: 20px;
  font-weight: bold;
  padding: 10px 50px;
  border-radius: 40px;
  outline: 2px solid rgb(0, 153, 255);
  outline-offset: 3px;
  transition: 0.5s;
}

.btnConnexion:hover{
  background-color: #048a2e;
  outline-color: #048a2e;
  scale: 1.2;
}

.modal{
  display: none;
  width: 100%;
  height: 100%;
}
</style>