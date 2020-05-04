<template>
    <card-container :data="data" type="small">
        <template slot="image">
            <card-image :data="data" :preventDarken="true"/>
        </template>
        <template slot="text">
            <card-text :data="data" align="center"/>
        </template>
        <!-- <template slot="footer">
            <small class="text-center text-muted px-1">Aşçı, Uşak, Bahçevan</small>
        </template> -->
    </card-container>
</template>

<script>
import CardContainer from '@/components/cards/CardContainer.vue'
import CardImage from '@/components/cards/CardImage.vue'
import CardOverLayerTop from '@/components/cards/CardOverLayerTop.vue'
import CardOverLayerBottom from '@/components/cards/CardOverLayerBottom.vue'
import CardText from '@/components/cards/CardText.vue'


export default {
    components: {
        'card-container': CardContainer,
        'card-image': CardImage,
        'card-over-layer-top': CardOverLayerTop,
        'card-over-layer-bottom': CardOverLayerBottom,
        'card-text': CardText,
    },
    props: {
        data: Object,
    }
}
</script>

<style scoped>
</style>
