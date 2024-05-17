<template>
  <Navbar v-if="loggedIn === 'true'" @logOut = "toggleLoggedIn"/>
  <RouterView></RouterView>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import { RouterView } from 'vue-router';
import { ref, provide, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const loggedIn = ref('false')
provide('loggedIn', loggedIn)

const router = useRouter()

onMounted(()=>{
  if(localStorage.getItem("loggedIn") == null){
    localStorage.setItem("loggedIn", "false")
    loggedIn.value = localStorage.getItem("loggedIn")
  }else{
    loggedIn.value = localStorage.getItem("loggedIn")
  }  

  // if (localStorage.getItem("loggedIn") === "true"){
  //   router.push('/marchand')
  // }
  
})

/*
  After Authentification
*/
const toggleLoggedIn = ()=>{
  localStorage.setItem("loggedIn", "false")
  loggedIn.value = localStorage.getItem("loggedIn")
}


</script>
