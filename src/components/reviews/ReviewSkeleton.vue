<template>
    <div>
        <div class="d-flex justify-content-between pl-3 pl-md-1 pr-1">
            <div class="h6 d-flex align-items-center mb-1"><skeleton-loader type="line" lineHeight="19px" style="width: 150px; max-width: 50vw"/></div>
            <div class="h6 mb-0 mr-4">
                <skeleton-loader type="dot"/>
            </div>
        </div>
        <skeleton-loader type="full-line"  class="px-3 px-md-1 w-100" :lineHeight="`${Math.floor(Math.random() * 70) + 40}px`"/>
    </div>
</template>

<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue'


export default {
    components: {
        'skeleton-loader': SkeletonLoader,
    },
    props: {
        isFullScreen: Boolean
    },
}
</script>

<style scoped>
</style>
