<template>
    <div v-if="num > 0" class="p-2 text-right badge-layer">
        <div><span class="badge btn-verydark text-white">{{ num }}</span></div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    computed: {
        rate() { return this.data.vote_average },
        age() { return this.data && (this.data.died_age || this.data.age) || 0 },
        num() { return this.rate || this.age }
    },
}
</script>

<style scoped>
.badge-layer {
    position: absolute;
    bottom: 0;
    right: 0;
}
.btn-verydark {
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3));
}
</style>
