<template>
    <card-container>
        <template slot="image">
            <card-image v-for="image in images" :src="image" size="narrow"/>
        </template>
        <template slot="over-layer-top">
            <card-over-layer-top/>
        </template>
        <template slot="over-layer-bottom">
            <card-over-layer-bottom/>
        </template>
        <template slot="badge-top">
            <card-badge-top/>
        </template>
        <template slot="badge-bottom">
            <card-badge-bottom/>
        </template>
        <template slot="text">
            <card-text heading="My best music related movies" :listData="['Szofijjja', '2 months ago']"/>
        </template>
        <template slot="footer">
            <card-footer type="list"/>
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
        
    },
    data: function() {
        return {
            images: ['https://image.tmdb.org/t/p/w1280/q2CtXYjp9IlnfBcPktNkBPsuAEO.jpg', 'https://image.tmdb.org/t/p/w1280/8tf1xLcZHcSxmXK0rSZNo2WAdRb.jpg', 'https://image.tmdb.org/t/p/w1280/kczQeXxj34UDRdIAwYmkAbgiBC6.jpg', 'https://image.tmdb.org/t/p/w1280/d27Ir9tRj7tgEHfksyb6eSXPOHB.jpg', 'https://image.tmdb.org/t/p/w1280/s4ubF2BR1iMM5Fra1f8nCfAIHKV.jpg']
        }
    },
}
</script>

<style scoped>
</style>
