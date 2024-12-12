<script setup>
const isOpen = defineModel()
</script>
<template>
    <div v-if="isOpen" class="wrapper" @click.self="isOpen = false">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: #fff;
    padding: 15px;
    min-height: 50px;
    min-width: 500px;
    display: block;
    position: static;

    @media (max-width: 768px) {
        min-width: none;
        width: 100%;
    }
}
</style>