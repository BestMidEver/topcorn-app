<template>
    <div class="stars-container ml-2" :class="computedClass" style="min-width: 89px">
        <span v-for="index in 5" :key="`s${index}`" class="btn btn-sm p-0"><font-awesome-icon :icon="[rate > index - 1 ? 'fas' : 'far', 'star']"/></span>
    </div>
</template>

<script>
export default {
    props: {
        rate: Number
    },
    computed: {
        computedClass() { return this.rate ? `active${this.rate}` : '' },
    },
}
</script>

<style scoped>
span svg { color: var(--muted-line-color) }
.active1 span:nth-child(-n+1) svg { color: var(--danger); }
.active2 span:nth-child(-n+2) svg { color: var(--warning); }
.active3 span:nth-child(-n+3) svg { color: var(--secondary); }
.active4 span:nth-child(-n+4) svg { color: var(--info); }
.active5 span:nth-child(-n+5) svg { color: var(--success); }
</style>