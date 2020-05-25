<template>
    <card-container :data="data" type="small" cardType="person">
        <template slot="image">
            <card-image :data="data" :preventDarken="true"/>
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


export default {
    components: {
        'card-container': CardContainer,
        'card-image': CardImage,
        'card-text': CardText,
    },
    props: {
        data: Object,
    },
    computed: {
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
