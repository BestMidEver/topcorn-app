<template>
    <div v-if="rate > 0" class="custom-over-layer d-flex flex-column justify-content-center">
        <div class="d-flex flex-row justify-content-center">
            <div class="text-white">
                <small>TMDb score</small>
                <span class="d-block"><span class="h5 text-warning">{{ rate }}</span><small>/10</small></span>
                <small>{{ count }}<span> {{ 'vote' | plural(count, 'votes') }}</span></small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
    },
    computed: {
        rate() { return this.data.vote_average },
        count() { return this.data.vote_count },
    },
}
</script>

<style scoped>
.custom-over-layer {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 50%!important;
}
</style>
