<template>
    <span class="stamp is-draft one-line" :class="computedClass" :style="{ '-webkit-mask-image': 'url(' + require('@/assets/rubber.png') + ')' }">{{ rateCodeToText(rate) }}</span>
</template>

<script>
import codeToText from '@/mixins/codeToText'


export default {
    mixins: [codeToText],
    props: {
        rate: Number
    },
    computed: {
        computedClass() { return this.rate > 0 ? `active${this.rate}` : 'd-none' },

    },
}
</script>

<style scoped>
.active1 { color: var(--danger); }
.active2 { color: var(--warning); }
.active3 { color: var(--secondary); }
.active4 { color: var(--info); }
.active5 { color: var(--success); }
.stamp {
    transform: rotate(12deg);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-5deg);
    font-size: 2rem;
    font-weight: 700;
    border: 0.25rem solid;
    display: inline-block;
    padding: 0.25rem 1rem;
    text-transform: uppercase;
    border-radius: 1rem;
    font-family: 'Courier';
    -webkit-mask-size: 944px 604px;
    mix-blend-mode: multiply;
}

.is-nope {
    border: 0.5rem double;
    -webkit-mask-position: 2rem 3rem;
}

.is-approved {
	border: 0.5rem solid;
	-webkit-mask-position: 13rem 6rem;
    border-radius: 0;
} 

.is-draft {
	border: 1rem double;
    font-family: "Open sans", Helvetica, Arial, sans-serif;
    border-radius: 0;
    padding: 0.5rem;
} 
</style>