<template>
    <div class="modal-container">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <slot name="content"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.modal-dialog-centered::before {
    height: unset;
}
</style>