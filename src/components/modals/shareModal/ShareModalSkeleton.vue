<template>
    <div>
        <div v-for="i in 12" :key="i" class="d-flex align-items-center btn btn-block btn-sm">
            <skeleton-loader type="thumbnail"/>
            <skeleton-loader type="line" lineHeight="19px" class="mx-2" style="width: 150px; max-width: 50vw"/>
        </div>
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
