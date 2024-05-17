<template>
    <tr>
        <td class="contrat"> {{ contrat.numContrat }} </td>
        <td class="contrat"> {{ contrat.cinMarchand }} </td>
        <td class="contrat"> {{ contrat.numPlace }} </td>
        <td class="contrat"> {{ contrat.codeActivite }} </td>
        <td class="contrat"> {{ contrat.dateContrat }} </td>
        <td v-if="isValide(contrat.dateExpiration)">
            <p class="badge bg-success">Valide</p>
        </td>
        <td v-else>
            <p class="badge bg-danger">Expiré</p>
        </td>
        <td style="color: var(--bs-primary); font-size: 18px;">
            <RouterLink :to="{
                name: 'modificationContrat',
                params: {
                    numContrat: contrat.numContrat,
                    dateContrat: contrat.dateContrat
                    }
                }">
                    <i class="bi bi-pencil-square"></i>
                  </RouterLink>
        </td>
        <td style="color: var(--bs-danger); font-size: 18px;">
            <a data-bs-toggle="modal" data-bs-target="#deleteModale" @click="$emit('update:modelValue', contrat.numContrat)">
                <i class="bi bi-trash3-fill"></i>
            </a>
        </td>
    </tr>
    <!-- <tr :class="`${contrat.numContrat}${contrat.dateContrat}`" style="display: none;">
        
            Détails : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet aperiam excepturi ad iste quibusdam hic quos vero perferendis totam aliquam iure rerum dolor, ratione voluptas nam nulla eos eligendi et?
        
    </tr> -->
</template>

<script setup>
import { parse, differenceInDays } from 'date-fns';
import { isBefore } from 'date-fns';

const currentDate = new Date()
// onMounted(()=>{
//     console.log(currentDate);
// })

// const convertDate = (date)=>{
//   var dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//   return dateStr;
// }

const isValide = (dateExpiration)=>{
   return differenceInDays(parse(dateExpiration, "yyyy-MM-dd", new Date()), currentDate ) >= 0
}

const props = defineProps(['contrat', 'modelValue']);

const emit = defineEmits('update:modelValue')

const detailsToggle = ()=>{
    const detail = document.getElementsByClassName(`${props.contrat.numContrat}${props.contrat.dateContrat}`);
    for(let i = 0; i<detail.length; i++){
        if(detail[i].style.display == 'none'){
            detail[i].style.display = 'table-row'
        }else{
            detail[i].style.display = 'none'
        }
    }
}
</script>

<style scoped>
.contrat{
    cursor: pointer;
}

/* .details{
    text-align: center;
} */

</style>