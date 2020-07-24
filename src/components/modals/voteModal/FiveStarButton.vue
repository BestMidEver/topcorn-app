<template>
    <div class="stars-container" :class="computedClass">
        <button v-for="index in 5" :key="`s${index}`" class="btn btn-sm border-0 p-0" @click="vote(index)" :disabled="$store.state.loading.responseWaiting"><font-awesome-icon :icon="[rate > index - 1 ? 'fas' : 'far', 'star']"/></button>
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
    methods: {
        vote(code) {
            this.$emit('update:rate', code)
        }
    }
}
</script>

<style scoped>
button svg { color: var(--muted-line-color) }
.active1 button:nth-child(-n+1) svg { color: var(--danger); }
.active2 button:nth-child(-n+2) svg { color: var(--warning); }
.active3 button:nth-child(-n+3) svg { color: var(--secondary); }
.active4 button:nth-child(-n+4) svg { color: var(--info); }
.active5 button:nth-child(-n+5) svg { color: var(--success); }
svg { font-size: 45px }
</style>