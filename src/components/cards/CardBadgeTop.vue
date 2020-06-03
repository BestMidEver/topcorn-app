<template>
    <div class="p-2 text-right badge-layer">
        <div><span class="badge btn-verydark text-white">91%</span></div>
    </div>
</template>

<script>
export default {
    props: {
    }
}
</script>

<style scoped>
.badge-layer {
    position: absolute;
    bottom: 30px;
    right: 0;
}
.btn-verydark {
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3));
}
</style>
