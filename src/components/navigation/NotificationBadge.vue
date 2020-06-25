<template>
    <span v-if="count > 0" class="badge badge-danger ml-1">{{ count }}</span>
</template>

<script>
export default {
    props: {
        count: Number,
    },
}
</script>

<style scoped>

</style>
