<template>
    <div class="custom-over-layer d-flex flex-column justify-content-center">
        <div class="d-flex flex-row justify-content-center">
            <div v-if="rate > 0" class="text-white">
                <small>TMDb score</small>
                <span class="d-block"><span class="h5 text-warning">{{ rate }}</span><small>/10</small></span>
                <small>{{ count }}<span> {{ 'vote' | plural(count, 'votes') }}</span></small>
            </div>
            <div v-if="age > 0" class="text-white">
                <small v-if="ifLivedAge > 0">When died</small>
                <span class="d-block"><span class="h5 text-warning">{{ age }}</span> <small>years old</small></span>
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
        age() { return this.data && (this.data.died_age || this.data.age) || 0 },
        ifLivedAge() { return this.data && this.data.died_age && this.data.age || 0 },
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
