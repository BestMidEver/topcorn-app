<template>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-2">
        <div class="card mx-1">
            <!-- <img class="card-img-top" :src="src"> -->
            <card-image :data="data" :preventDarken="true"/>
            <!-- <div v-if="link && link.name" class="card-block">
                <a ng-href="/movie/299534" href="/movie/299534">
                    <h6 class="card-title px-1 py-1 my-0 text-dark text-left">{{ link.name }}<small v-if="link.year" class="text-muted d-block pt-1"><em> ({{ link.year }})</em></small></h6>
                </a>
            </div> -->
        </div>
    </div>
</template>

<script>
import CardImage from '@/components/cards/CardImage.vue'


export default {
    components: {
        'card-image': CardImage,
    },
    props: {
        data: Object,
    },
    computed: {
        src() { return this.data.file_path && `${process.env.VUE_APP_TMDB_W500_URL}${this.data.file_path}` }
    }
}
</script>

<style scoped>
</style>
