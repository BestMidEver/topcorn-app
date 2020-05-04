<template>
    <div class="header-bar bg-white bottom-line top-line py-1 row text-center">
        <div class="col-1">
            <div class="d-flex">
                <router-link to="/back" class="text-dark px-2">
                    <font-awesome-icon :icon="['fas', 'chevron-left']"/>
                </router-link>
            </div>
        </div>
        <div class="col-10">Szofijjja</div>
    </div>
</template>

<script>
export default {
    components: {
    },
}
</script>

<style scoped>
.header-bar{
    position: sticky;
    top: 0;
    z-index: 1060;
}
@media (min-width: 768px) {
	.fixed-bottom { bottom: 0; top: auto; }
}
</style>
