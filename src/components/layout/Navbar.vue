<template>
  <div class="row container">
    <a class="col-6 col-sm-3 col-md-2"><img src="../../assets/image/Logo capitale economique.png" class="col-12"></a>
  </div>

  <nav class="navbar navbar-expand-sm navbar-dark bg-dark justify-content-end">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container">
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="nav nav-pills justify-content-end">
          <li class="nav-item">
            <RouterLink :to="{name: 'marchand'}" :class="{active : isRouteStartsWith('/marchand')}" exact-active-class="active" class="nav-link">Marchand</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'marche'}" :class="{active : isRouteStartsWith('/marche')}" exact-active-class="active" class="nav-link">Marché</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'categorie'}" :class="{active : isRouteStartsWith('/categorie')}" exact-active-class="active" class="nav-link">Catégories</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'contrat'}" :class="{active : isRouteStartsWith('/contrat')}" exact-active-class="active" class="nav-link">Contrat</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'payement'}" :class="{active : isRouteStartsWith('/payement')}" exact-active-class="active" class="nav-link">Payement</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'recette'}" :class="{active : isRouteStartsWith('/recette')}" exact-active-class="active" class="nav-link">Recette</RouterLink>
          </li>
          <li style="margin-left:20px;">
            <button @click="logOut" class="btn btn-outline-danger">Déconnexion</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

/*Router*/
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const isRouteStartsWith = (path)=>{
  return route.path.startsWith(path)
}

/*Emit*/
const emit = defineEmits('logOut')

const logOut = ()=>{
  emit('logOut')
  router.push({name: 'home'})
}

</script>

<style>
.navbar{
  z-index: 1;
}

.nav{
  --bs-nav-link-color: var(--bs-gray-500);
  --bs-nav-link-hover-color: #048a2e;
  --bs-nav-link-hover-bg: #048a2e;
} 

a{
    cursor: pointer;
}

.navbar-expand-sm .navbar-collapse {
    justify-content: right;
}

nav > button{
  margin: 5px;
}

.nav-item{
  position: relative;
}

.nav-item::after{
  content: '';
  position: absolute;
  bottom: 5px;
  right: 1.25em;
  left: 1.25em;
  border-bottom: 2px solid var(--bs-blue);
  transform: scale(0, 1);
  transition: transform ease-out 500ms;
}

.nav-item:hover::after{
  transform: scale(1, 1);
}

</style>