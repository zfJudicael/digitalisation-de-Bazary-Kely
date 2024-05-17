import { defineStore } from "pinia";
import axios from "axios";
import { differenceInDays, addDays,isBefore , isSunday } from 'date-fns'


const dayWithoutSunday = (datedeb, datefin) => {
  const dateDeb = new Date(datedeb)
  const dateFin = new Date(datefin)
  
  if (isBefore(dateFin, dateDeb)) {
    return 0
  }else{
    const totalDay = differenceInDays(dateFin, dateDeb)
    let dayWithoutSunday = 0

    for(let i=0; i<=totalDay; i++){
      const currentDate = addDays(dateDeb, i)
      if(!isSunday(currentDate))
        ++dayWithoutSunday
    }
    return dayWithoutSunday
  }
} 


export const useRecetteStore = defineStore('recetteStore', {
  state: () => ({
    loading: true,
    recettes: [],
    dateDeb: null,
    dateFin: null,
    message: null
  }),

  actions: {
    selectRecette(dateDebVal, dateFinVal){
      axios.post('http://localhost/Projet%20Digitalisation%20de%20Bazary%20Kely/API/recette/selectRecette.php', {
        dateDeb: dateDebVal,
        dateFin: dateFinVal
      })
        .then((response) => {
          console.log(JSON.parse(JSON.stringify(response.data.recettes)));
          this.dateDeb = dateDebVal
          this.dateFin = dateFinVal
          this.loading = false
          this.recettes = response.data.recettes
          this.message = response.data.message
        })
    }
  },

  getters: {
    getByMarche : (state) => {
      let recettesParMarche = []

      if(state.recettes[0].codeMarche){

        recettesParMarche.push({ 
          codeMarche: state.recettes[0].codeMarche, 
          nomMarche: state.recettes[0].nomMarche,
          montant: 0,
          montantMin: 0,
        })
        
        state.recettes.map( recette => {

            if (recette.codeMarche == recettesParMarche[recettesParMarche.length-1].codeMarche) {
              recettesParMarche[recettesParMarche.length-1].montant += (recette.nombreJourPaye * recette.taux)

              if(recette.debutPayement > state.dateDeb){

                if(recette.dateExpiration < state.dateFin) {
                  recettesParMarche[recettesParMarche.length-1].montantMin += (dayWithoutSunday(recette.debutPayement, recette.dateExpiration) * recette.taux)
                }else{
                  recettesParMarche[recettesParMarche.length-1].montantMin += (dayWithoutSunday(recette.debutPayement, state.dateFin) * recette.taux)
                }
                
              }else{

                if(recette.dateExpiration < state.dateFin) {
                  recettesParMarche[recettesParMarche.length-1].montantMin += (dayWithoutSunday(state.dateDeb, recette.dateExpiration) * recette.taux)
                  recettesParMarche[recettesParMarche.length-1].nombreJourAPaye = dayWithoutSunday(state.dateDeb, recette.dateExpiration)
                }else{
                  recettesParMarche[recettesParMarche.length-1].montantMin += (dayWithoutSunday(state.dateDeb, state.dateFin) * recette.taux)
                }
                
              }

            }else{
              recettesParMarche.push({ 
                codeMarche: recette.codeMarche, 
                nomMarche: recette.nomMarche,
                montant: recette.nombreJourPaye * recette.taux,
                montantMin: dayWithoutSunday( (recette.debutPayement > state.dateDeb ? recette.debutPayement : state.dateDeb ), (recette.dateExpiration < state.dateFin ? recette.dateExpiration : state.dateFin)) * recette.taux
              })    

            } 
          })        
      }
      return recettesParMarche
    },

    getByPercepteur : (state) => (codeMarche) => {
      const recettesParMarche = state.recettes.filter( recette => recette.codeMarche === codeMarche )

      let recettesParPercepteur = []

      if(recettesParMarche[0]){
        recettesParPercepteur.push({
          codePercepteur: recettesParMarche[0].codePercepteur,
          nomPercepteur: recettesParMarche[0].nomPercepteur,
          prenomsPercepteur: recettesParMarche[0].prenomsPercepteur,
          montant: 0,
          montantMin: 0
        })

        recettesParMarche.map( recette => {

          if(recette.codePercepteur === recettesParPercepteur[recettesParPercepteur.length-1].codePercepteur){
            recettesParPercepteur[recettesParPercepteur.length-1].montant += (recette.nombreJourPaye * recette.taux)
            recettesParPercepteur[recettesParPercepteur.length-1].montantMin += dayWithoutSunday( (recette.debutPayement > state.dateDeb ? recette.debutPayement : state.dateDeb ), (recette.dateExpiration < state.dateFin ? recette.dateExpiration : state.dateFin)) * recette.taux 
    
          }else{
            recettesParPercepteur.push({
              codePercepteur: recette.codePercepteur,
              nomPercepteur: recette.nomPercepteur,
              prenomsPercepteur: recette.prenomsPercepteur,
              montant: recette.nombreJourPaye * recette.taux,
              montantMin: dayWithoutSunday( (recette.debutPayement > state.dateDeb ? recette.debutPayement : state.dateDeb ), (recette.dateExpiration < state.dateFin ? recette.dateExpiration : state.dateFin)) * recette.taux
            })
          }

        })
      }
      return recettesParPercepteur
    },

    getByPlace : (state) => (codePercepteur) => {
      const recettesParPercepteur = state.recettes.filter( recette => recette.codePercepteur === codePercepteur)

      let recettesParPlace = []

      recettesParPercepteur.map( recette => {
        recettesParPlace.push({
          numPlace: recette.numPlace,
          nomMarchand: recette.nomMarchand,
          prenomMarchand: recette.prenomMarchand,
          lot: recette.lot,
          joursPayes: recette.nombreJourPaye,
          joursAPayer: dayWithoutSunday( (recette.debutPayement > state.dateDeb ? recette.debutPayement : state.dateDeb ), (recette.dateExpiration < state.dateFin ? recette.dateExpiration : state.dateFin)),
          montant: recette.nombreJourPaye * recette.taux,
          montantMin: dayWithoutSunday( (recette.debutPayement > state.dateDeb ? recette.debutPayement : state.dateDeb ), (recette.dateExpiration < state.dateFin ? recette.dateExpiration : state.dateFin)) * recette.taux

        })
      })
      return recettesParPlace
    }
  }
})