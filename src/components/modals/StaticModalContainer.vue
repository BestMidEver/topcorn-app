<template>
    <div class="modal-container" :class="customize">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <slot name="content"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: { validator: value => ['expanded', 'default'].includes(value) },
    },
    computed: {
        customize() { return this.type === 'expanded' ? 'expand-on-mobile' : '' },
    }
}
</script>

<style scoped>
.modal-dialog-centered::before {
    height: unset;
}
.expand-on-mobile > .modal-dialog {
    margin: 0;
}
.expand-on-mobile > div > .modal-content {
    border-radius: unset;
    border: none;
}
@media (min-width: 576px) {
    .expand-on-mobile > .modal-dialog {
        margin: 1.75rem auto;
    }
    .expand-on-mobile > div > .modal-content {
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
    }
}
</style>