<template>
    <div class="backdrops z-3" @click.self="$emit('closeModal')">
        <div class="mod">
            <slot name="nouveauMarchand"></slot> 
            <slot name="nouveauMarche"></slot> 
            <slot name="modificationMarchand"></slot>        
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['closeModal'])

</script>

<style>
.mod{
    background-color: white;
    margin: 128px auto 0 auto;
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}

.backdrops {
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }

    .modal h1 {
        color: #03cfb4;
        border: none;
        padding: 0;
    }

    .modal .actions {
        text-align: center;
        margin: 30px 0 10px 0;
    }

    .modal .actions a {
        color: #333;
        padding: 8px;
        border: 1px solid #eee;
        border-radius: 4px;
        text-decoration: none;
        margin: 10px;
    }

    .modal.sale {
        background: crimson;
        color: white;
    }

    .modal.sale h1 {
        color: white;
    }

    .modal.sale .actions {
        color: white;
    }

    .modal.sale .actions a {
        color: white;
    }
</style>