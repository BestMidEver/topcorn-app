<template>
    <div class="custom-over-layer d-flex flex-column justify-content-center">
        <div class="d-flex flex-row justify-content-center">
            <div class="text-white">
                <small>Based on your taste</small>
                <span class="d-block"><span class="h5 text-warning">91%</span><small> match</small></span>
                <small><span class="h5 text-warning">352</span>/408 points</small>                                                                 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
    }
}
</script>

<style scoped>
.custom-over-layer {
    position: absolute;
    width: 100%;
    top: 0;
    height: 50%!important;
}
</style>
