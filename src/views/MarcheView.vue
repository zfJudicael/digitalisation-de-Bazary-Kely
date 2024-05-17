<template>
    <div class="container mt-5 pb-4">
        <div class="row">
            <h1>Marché</h1>
            <p class="text col-md-6">
                Les marchés sont distribués dans les cinq (05) arrondissement de la Commune Urbaine de Toamasina. Chaque marché possède plusieurs places et ses propres percepteurs. 
            </p>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3" @click="$router.push({ name: 'nouveauMarche'})">Nouveau Marché</button>
            </div>
                
        </div>
    </div>

    <div v-for="marche in marcheStore.marches" class="marche col-12 mb-3">
        <div class="container">
            <div class="headerMarche d-flex">
                <div class="d-flex justify-content-start">
                    <h1><i class="bi bi-shop"></i></h1>
                    <h5 style="margin-left: 10px;">{{ marche.nomMarche+'-'+marche.codeMarche}}</h5>
                </div>
                <div class="headerIcon">
                    <RouterLink :to="{
                        name: 'modificationMarche',
                        params: { codeMarche: marche.codeMarche },
                        query: {
                            nomMarche: marche.nomMarche,
                            nomArrond: marche.nomArrond
                        }
                        }" style="color: var(--bs-black-100); font-size: 25px">
                        <i class="bi bi-pencil-square"></i>
                    </RouterLink>
                   
                    <a data-bs-toggle="modal" data-bs-target="#deleteModale" style="color: var(--bs-danger); font-size: 25px;" @click="marcheToDelete= marche.codeMarche">
                        <i class="bi bi-trash3-fill"></i>
                    </a>
                </div>      
            </div>
            
            <div class="descMarche">   
                <div>
                    <div class="icon mb-2">
                        <i class="bi bi-pin-map"></i>
                    </div>

                    <h6>Arrondissement : {{ marche.nomArrond }}</h6>
                    <!-- <button class="btn">Voir plus</button> -->
                </div>
                <div>
                    <div class="icon mb-2">
                        <i class="bi bi-shop-window"></i>
                    </div>
                    <h6>Places</h6>
                    <button class="btn" @click="$router.push({ name: 'place', params: { codeMarche: marche.codeMarche } })">Voir plus</button>
                </div>
                <div>
                    <div class="icon mb-2">
                        <i class="bi bi-ticket-perforated"></i>
                    </div>
                    <h6>Percepteur</h6>
                    <button class="btn" @click="$router.push({ name: 'percepteur', params: { codeMarche: marche.codeMarche } })">Voir plus</button>
                </div>
            </div>
           
        </div>
    </div>
    
    <div class="d-flex justify-content-center">
        <button class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-3" @click="$router.push({ name: 'arrondissement'})">Arrondissement</button>
    </div>

    <DeleteModal>
        <template v-slot:deleteMarche>
            <!-- Modal body -->
            <div class="modal-body">
                    Suppression de Marché : <br>
                    {{ marcheToDelete }}
            </div>
        
            <div class="mb-3">
                <button class="btn btnAnnuler me-2" data-bs-dismiss="modal">Annuler</button>
                <button class="btn btn-danger" data-bs-dismiss="modal" @click="deleteMarche">Supprimer</button>
            </div> 
        </template>
    </DeleteModal>
</template>

<script setup>
import DeleteModal from '../components/DeleteModal.vue'
import { ref, onMounted } from 'vue';
import { useMarcheStore } from '../stores/marcheStore';

const marcheToDelete = ref('')

const marcheStore = useMarcheStore()

onMounted(()=>{
    marcheStore.selectMarche()
})

const deleteMarche = ()=>{
    marcheStore.deleteMarche(marcheToDelete.value)
}
</script>

<style scoped>
.btnAnnuler{
    background-color: var(--bs-gray-300);
}
.btnAnnuler:hover{
    outline: 1px solid var(--bs-primary);
    color: var(--bs-primary);
}
.marche{
    padding: 25px;
    display: inline-block;
    position: relative;
}
.headerMarche  div{
    width:max-content;
    display: inline;
}

.headerIcon{
    position: absolute;
    top: 20px;
    right: 20px;
}
.headerIcon a{
    margin: 0 5px;
}

.marche h1, h4{
    display: inline;
}

.marche .btn{
    color: var(--bs-primary);
    outline: 1px solid var(--bs-primary);
}
.marche .btn:hover{
    color: #fff;
    background-color: var(--bs-primary);
    outline: none;
}

.marche .d-flex{
    align-items: center;
}
.descMarche{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}

.descMarche div{
    display: grid;
    justify-items: center;
}

.icon{
    width: 80px;
    height: 80px;
    background-color: var(--bs-primary);
    border-radius: 50%;
    align-content: center;
}
.icon i{
    font-size: 40px;
    color: #fff;
    display: flex;
}

.marche:nth-child(even){
    background-color: var(--bs-primary);
    color: #fff;
}

.marche:nth-child(even) .btn{
    color: #fff;
    outline: 1px solid #fff;
}

.marche:nth-child(even) .btn:hover{
    color: var(--bs-primary);
    background-color: white;
    outline: none;
}

.marche:nth-child(even) .icon{
    background-color: #fff;
    color: var(--bs-primary);
}
.marche:nth-child(even) .icon i{
    color: var(--bs-primary);
}

@media screen and (max-width: 990px){
    .descMarche{
        justify-content: space-between;
    }
}
</style>