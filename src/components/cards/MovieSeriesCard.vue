<template>
    <card-container :data="data" :cardType="type">
        <template slot="image">
            <card-image :data="data"/>
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
            <card-text :data="data"/>
        </template>
        <template slot="footer">
            <card-footer :data="data" :boundedTo="boundedTo" :dataType="type"/>
        </template>
    </card-container>
</template>

<script>
import CardContainer from '@/components/cards/CardContainer.vue'
import CardImage from '@/components/cards/CardImage.vue'
import CardOverLayerTop from '@/components/cards/CardOverLayerTop.vue'
import CardOverLayerBottom from '@/components/cards/CardOverLayerBottom.vue'
import CardBadgeTop from '@/components/cards/CardBadgeTop.vue'
import CardBadgeBottom from '@/components/cards/CardBadgeBottom.vue'
import CardText from '@/components/cards/CardText.vue'
import CardFooter from '@/components/cards/CardFooter.vue'


export default {
    components: {
        'card-container': CardContainer,
        'card-image': CardImage,
        'card-over-layer-top': CardOverLayerTop,
        'card-over-layer-bottom': CardOverLayerBottom,
        'card-badge-top': CardBadgeTop,
        'card-badge-bottom': CardBadgeBottom,
        'card-text': CardText,
        'card-footer': CardFooter,
    },
    props: {
        data: Object,
        boundedTo: Array,
        type: String,
        cardType: String
    },
}
</script>

<style scoped>
</style>
