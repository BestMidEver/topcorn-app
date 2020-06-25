<template>
    <div class="bottom-line d-flex pl-2 py-2 pr-1 d-flex align-items-center">
        <div class="thumbnail-img d-flex align-items-center justify-content-center"><skeleton-loader type="dot"/></div>
        <skeleton-loader type="line" lineHeight="19px" class="flex-grow-1 mx-2"/>
        <div class="object-img d-flex align-items-center justify-content-center"><skeleton-loader type="dot"/></div>
        <div class="object-img d-flex align-items-center justify-content-center ml-1" style="width: 42px"><skeleton-loader type="dot"/></div>
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
.thumbnail-img {
    width: 46px;
    height: 46px;
    object-fit: cover;
    /* min-width: 46px; */
    border-radius: 46px;
}
.object-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>
