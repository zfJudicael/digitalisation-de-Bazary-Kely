import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarchandView from '../views/MarchandView.vue'
import NouveauMarchand from '../components/marchand/NouveauMarchand.vue'
import ModificationMarchand from '../components/marchand/ModificationMarchand.vue'

import MarcheView from '../views/MarcheView.vue'
import NouveauMarche from '../components/marche/NouveauMarche.vue'
import ModificationMarche from '../components/marche/ModificationMarche.vue'
import PlaceView from '../views/PlaceView.vue'
import ArrondissementView from '../views/ArrondissementView.vue'

import NouveauPlace from '../components/place/NouveauPlace.vue'

import PercepteurView from '../views/PercepteurView.vue' 
import NouveauPercepteur from '../components/percepteur/NouveauPercepteur.vue'
import ModificationPercepteur from '../components/percepteur/ModificationPercepteur.vue'
import PlaceOccuper from '../components/percepteur/PlaceOccuper.vue'
import NouveauOccupation from '../components/percepteur/occuper/NouveauOccupation.vue'

import ContratView from '../views/ContratView.vue'
import NouveauContrat from '../components/contrat/NouveauContrat.vue'
import ModificationContrat from '../components/contrat/ModificationContrat.vue'

import PayementView from '../views/PayementView.vue'
import ListeContrat from '../components/payement/ListeContrat.vue'
import NouveauPayement from '../components/payement/NouveauPayement.vue'

import CategorieView from '../views/CategorieView.vue'
import ListeActivite from '../components/categorie/ListeActivite.vue'
import ListeTaux from '../components/categorie/ListeTaux.vue'
// import InitialiserTaux from '../components/categorie/InitialiserTaux.vue'

import RecetteView from '../views/RecetteView.vue'

import NotFound from '../components/NotFound.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    //Marchand
    {
      path: '/marchand',
      name: 'marchand',
      component: MarchandView,
    },
    {
        path: '/marchand/nouveau',
        name: 'nouveauMarchand',
        component: NouveauMarchand
    },
    {
      path: '/marchand/modification/:cin',
      name: 'modificationMarchand',
      component: ModificationMarchand
    },
    //Marche
    {
      path: '/marche',
      name: 'marche',
      component: MarcheView
    },
    {
      path: '/marche/nouveau',
      name: 'nouveauMarche',
      component: NouveauMarche
    },
    {
      path: '/marche/modification/:codeMarche',
      name: 'modificationMarche',
      component: ModificationMarche
    },
    //Place
    {
      path: '/marche/:codeMarche/place',
      name: 'place',
      component: PlaceView
    },
    {
      path: '/marche/:codeMarche/place/nouveau',
      name: 'nouveauPlace',
      component: NouveauPlace
    },
    //Percepteur
    {
      path: '/marche/:codeMarche/percepteur',
      name: 'percepteur',
      component: PercepteurView
    },
    {
      path: '/marche/:codeMarche/percepteur/:matricule/place_occupes',
      name: 'placeOccuper',
      component: PlaceOccuper
    },
    {
      path: '/marche/:codeMarche/percepteur/:matricule/place_occupees/nouveau',
      name: 'nouveauOccupation',
      component: NouveauOccupation
    },
    {
      path: '/marche/:codeMarche/percepteur/nouveau',
      name: 'nouveauPercepteur',
      component: NouveauPercepteur
    },
    {
      path: '/marche/:codeMarche/percepteur/modification/:matricule',
      name: 'modificationPercepteur',
      component: ModificationPercepteur
    },
    //Arrondissement
    {
      path: '/marche/arrondissement',
      name: 'arrondissement',
      component: ArrondissementView
    },
    //Contrat
    {
      path: '/contrat',
      name: 'contrat',
      component: ContratView
    },
    {
      path: '/contrat/nouveau',
      name: 'nouveauContrat',
      component: NouveauContrat
    },
    {
      path: '/contrat/modification/:numContrat/:dateContrat',
      name: 'modificationContrat',
      component: ModificationContrat
    },
    //Payement
    {
      path: '/payement',
      name: 'payement',
      component: PayementView
    },
    {
      path: '/payement/:percepteur/ListeContrat',
      name: 'listeContrat',
      component: ListeContrat
    },
    {
      path: '/payement/:percepteur/ListeContrat/nouveau',
      name: 'nouveauPayement',
      component: NouveauPayement
    },
    //Categorie
    {
      path: '/categorie',
      name: 'categorie',
      component: CategorieView
    },
    {
      path: '/categorie/liste_activite',
      name: 'listeActivite',
      component: ListeActivite
    }
    ,
    {
      path: '/categorie/liste_taux',
      name: 'listeTaux',
      component: ListeTaux
    },
    //Recette
    {
      path: '/recette',
      name: 'recette',
      component: RecetteView
    },
    //Catchall 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }

  ]
})

router.beforeEach((to, from, next)=>{
  // // Vérifiez si l'utilisateur est connecté
  // if (to.name !== 'home' && localStorage.getItem("loggedIn") !== 'true') {
  //   // L'utilisateur n'est pas connecté, redirigez-le vers la page d'accueil
  //   next({ name: 'home' });
  // } else {
  //   // L'utilisateur est connecté ou accède à la page d'accueil, continuez la navigation
  //   next();
  // }

  // if(localStorage.getItem("loggedIn") === 'true'){
  //   if(to.name === 'home'){
  //     next({ name: 'marchand' })
  //   }else{
  //     next()
  //   }
  // }else{
  //   next({name: 'home'})
  // }
  
  if(localStorage.getItem("loggedIn") === 'true'){
    if(to.name === 'home'){
      // Évitez de rediriger si l'utilisateur est déjà sur la route 'marchand'
      if(from.name !== 'marchand'){
        next({ name: 'marchand' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    // Évitez de rediriger si l'utilisateur est déjà sur la route 'home'
    if(to.name !== 'home'){
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

// const router = new VueRouter({
//   routes,
//   linkAnctiveClass: "active", //Active class for non-exact links.
//   linkExactActiveClass: "active" //Active class for *exact* links.
// })

export default router
