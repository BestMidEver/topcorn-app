<template>
    <div class="row no-gutters" :class="isFullScreen ? 'pt-md-3' : 'mt-5'">
        <div class="col-12 col-md-3 col-lg-3">
            <img class="w-100" :class="isFullScreen ? 'd-inline mb-3 mb-md-0' : 'd-none d-md-inline'" :src="loadingSrc"/>
        </div>
        <div class="col-12 col-md-9 col-lg-6">
            <div>
                <div class="d-flex align-items-center mb-lg-2">
                    <span class="h6 pt-md-0 pl-3 mb-0">
                        <skeleton-loader type="line" lineHeight="19px" style="width: 150px; max-width: 50vw"/>
                    </span>
                </div>
                <div class="px-3 pr-md-1">
                    <div class="mt-2"><p><skeleton-loader type="full-line" lineHeight="120px" class="w-100"/></p></div>
                    <div v-for="(skeleton, index) in 2" :key="index" class="mt-3">
                        <div class="h6 pt-1"><span><skeleton-loader type="line" lineHeight="21px" style="width: 150px; max-width: 50vw"/></span></div>
                        <div class="h6 pt-1"><span><skeleton-loader type="line" lineHeight="21px" style="width: 100%"/></span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3 d-none d-md-inline d-lg-none"></div>
        <div class="col-9 col-lg-3" :class="isFullScreen ? 'd-block' : 'd-none d-lg-block'">
            <div class="px-3 pr-md-1">
                <div class="h5 d-none d-lg-inline"><skeleton-loader type="full-line" lineHeight="27px" style="width: 123px"/></div>
                <div v-for="(skeleton, index) in 7" :key="index" class="mt-3">
                    <div class="h6 pt-1"><span><skeleton-loader type="line" lineHeight="21px" style="width: 100%"/></span></div>
                    <div class="h6 pt-1"><span><skeleton-loader type="line" lineHeight="21px" style="width: 100%"/></span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import seriesComputeds from './seriesComputeds.js'


export default {
    components: {
        'skeleton-loader': SkeletonLoader,
    },
    mixins: [seriesComputeds],
    props: {
        isFullScreen: Boolean
    },
    computed: {
        loadingSrc() { return this.detailedType === 'episode' ? require('@/assets/9x16loading.png') : require('@/assets/2x3loading.png') },
    }
}
</script>

<style scoped>
</style>
