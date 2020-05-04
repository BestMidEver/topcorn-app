<template>
    <div>
        <custom-button type="scroll-up" iconSize="22px" class="btn-sm mt-0 up" @click="scrollToTop()"></custom-button>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'custom-button': CustomButton,
    },
    props: {
    },
    methods: {
        scrollToTop () {
            $("#full-screen-component").animate({ scrollTop: 0 }, 'fast');
        }
    }
}
</script>

<style scoped>
.up{
    position: absolute;
    bottom: calc(var(--navigation-bar-height) + 1.5rem);
    right: 1.5rem;
    background: var(--background-color);
    z-index: 2000;
}
@media (min-width: 768px) {
  .up{  bottom: 1.5rem; }
}
</style>
