<template>
    <div class="header-bar bg-white bottom-line top-line row text-center no-gutters nav-shadow">
        <div class="col-1 d-flex align-items-center">
            <div class="d-flex">
                <a @click="backAction()" class="px-3 py-1" style="color: var(--secondary)!important">
                    <font-awesome-icon :icon="['fas', 'chevron-left']"/>
                </a>
            </div>
        </div>
        <div v-if="!loading" class="col-10 d-flex align-items-center justify-content-center small" style="overflow: auto">{{ title }}</div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        title: String,
        to: String,
        loading: Boolean,
        goBack: Boolean
    },
    methods: {
        backAction() {
            if(this.goBack) this.$router.go(-1)
            else if(this.to) this.$router.replace(this.to)
        }
    }
}
</script>

<style scoped>
.header-bar{
    position: sticky;
    top: 0;
    z-index: 1020;
    color: rgba(0,0,0,.5);
}
@media (min-width: 768px) {
	.fixed-bottom { bottom: 0; top: auto; }
}
.nav-shadow {
    -webkit-box-shadow: 0 .02rem .1rem rgba(0,0,0,.075)!important;
    box-shadow: 0 .02rem .1rem rgba(0,0,0,.075)!important;
}
</style>
