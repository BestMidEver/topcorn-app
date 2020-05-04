<template>
    <div v-if="rate > 0" class="p-2 text-right badge-layer">
        <div><span class="badge btn-verydark text-white">{{ rate }}</span></div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    computed: {
        rate() { return this.data.vote_average },
    },
}
</script>

<style scoped>
.badge-layer {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
