<template>
    <card-container :data="data" type="small" cardType="person">
        <template slot="image">
            <card-image :data="data" :preventDarken="preventDarken"/>
        </template>
        <template slot="over-layer-top">
            <card-over-layer-top :data="data" :cardType="cardType"/>
        </template>
        <template slot="over-layer-bottom">
            <card-over-layer-bottom :data="data"/>
        </template>
        <template slot="badge-top">
            <card-badge-top :data="data" :cardType="cardType"/>
        </template>
        <template slot="badge-bottom">
            <card-badge-bottom :data="data"/>
        </template>
        <template slot="text">
            <card-text :data="data" align="center"/>
        </template>
        <template slot="bottom-body">
            <div v-if="isTrue(details)" class="text-center detail mb-1 mx-1">
                <small class="text-muted">{{ details }}</small>
            </div>
        </template>
    </card-container>
</template>

<script>
import CardContainer from '@/components/cards/CardContainer.vue'
import CardImage from '@/components/cards/CardImage.vue'
import CardText from '@/components/cards/CardText.vue'
import CardOverLayerTop from '@/components/cards/CardOverLayerTop.vue'
import CardOverLayerBottom from '@/components/cards/CardOverLayerBottom.vue'
import CardBadgeTop from '@/components/cards/CardBadgeTop.vue'
import CardBadgeBottom from '@/components/cards/CardBadgeBottom.vue'


export default {
    components: {
        'card-container': CardContainer,
        'card-image': CardImage,
        'card-text': CardText,
        'card-over-layer-top': CardOverLayerTop,
        'card-over-layer-bottom': CardOverLayerBottom,
        'card-badge-top': CardBadgeTop,
        'card-badge-bottom': CardBadgeBottom,
    },
    props: {
        data: Object,
        cardType: String
    },
    computed: {
        age() { return this.data && (this.data.died_age || this.data.age) || 0 },
        ifLivedAge() { return this.data && this.data.died_age && this.data.age || 0 },
        preventDarken() { return !(this.age > 0) },
        details() {
            if(this.data.character) return this.data.character
            if(this.data.job) return Array.isArray(this.data.job) ? this.data.job.join(', ') : this.data.job
        },
    }
}
</script>

<style scoped>
.detail {
    line-height: 1;
}
</style>
