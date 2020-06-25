<template>
    <div class="image-container mt-md-0 d-flex justify-content-center" :style="{ 'margin-top': expandStatus === 'compressed' ? '' : '-10vw' }" style="z-index: -1">
        <img class="card-img-top" :style="{ width: expandStatus === 'compressed' ? '50%' : '' }" :src="require('@/assets/no-search-result.svg')"/>
    </div>
</template>

<script>
export default {
    props: {
        expandStatus: {
            validator: value => ['expanded', 'compressed'].includes(value)
        },
    },
}
</script>

<style scoped>
.image-container{
    max-width: 500px;
}
</style>
