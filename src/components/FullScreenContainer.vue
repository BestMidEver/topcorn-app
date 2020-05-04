<template>
    <div>
        <div :id="isFullScreen ? 'full-screen-component' : ''" :class="{ 'full-screen' : isFullScreen }" @scroll.passive="handleScroll">
            <slot></slot>
        </div>
        <scroll v-show="isScrollToTopVisible"/>
    </div>
</template>

<script>
import Scroll from '@/components/Scroll.vue'


export default {
    components: {
        'scroll': Scroll,
    },
    props: {
        isFullScreen: Boolean
    },
    data: function() {
        return {
            isScrollToTopVisible: false
        }
    },
    methods: {
        handleScroll (event) {
            this.isScrollToTopVisible = event.target.scrollTop > 1000
        }
    }
}
</script>

<style scoped>
.full-screen { 
    height: calc(100vh - 56px);
    width: 100%;
    overflow: auto; 
    position: fixed;
    top: 0;
    background: var(--background-color);
    z-index: 1500;
}

@media (min-width: 768px) {
  .full-screen {  margin-top: 56px; }
}
</style>
