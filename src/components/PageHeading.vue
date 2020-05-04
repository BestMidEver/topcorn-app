<template>
    <div class="d-flex justify-content-center">
        <h1 class="h5 text-center mt-3 px-3 col-12 col-xl-8" :class="(center ? '' : 'text-md-left ') + (size || 'h5')">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        center: Boolean,
        size: String
    }
}
</script>

<style scoped>

</style>
