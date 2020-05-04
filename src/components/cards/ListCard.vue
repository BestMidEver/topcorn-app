<template>
    <card-container :data="data">
        <template slot="image">
            <card-image v-for="(image, i) in images" :key="`${i}-${image.cover_path}`" :data="image" size="narrow"/>
        </template>
        <template slot="over-layer-bottom">
            <card-over-layer-bottom/>
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
        data: Object,
    },
    computed: {
        images() {
            return [
                { cover_path: this.data.m1_cover_path },
                { cover_path: this.data.m2_cover_path },
                { cover_path: this.data.m3_cover_path },
                /* { cover_path: this.data.m4_cover_path },
                { cover_path: this.data.m5_cover_path },
                { cover_path: this.data.m6_cover_path }, */
            ]
        }
    }
}
</script>

<style scoped>
</style>
