<template>
    <cover-container coverSrc="https://image.tmdb.org/t/p/w1280/q2CtXYjp9IlnfBcPktNkBPsuAEO.jpg" profileSrc="https://image.tmdb.org/t/p/w300_and_h300_bestv2/xD4jTA3KmVp5Rq3aHcymL9DUGjD.jpg">
        <template slot="right-text-first-row">
            <h5><span class="text-left">Carrie-Anne Moss (52)</span></h5>
        </template>
        <template slot="right-text-second-row">
            <font-awesome-icon :icon="['fas', 'map-marker']"/><div class="d-inline pl-1">Vancouver, British Columbia, Canada</div>
        </template>
        <template slot="right-text-third-row">
            <font-awesome-icon :icon="['fab', 'studiovinari']"/><div class="d-inline pl-1">2017-07-16</div>
        </template>
    </cover-container>
</template>

<script>
import CoverContainer from '@/components/profile/CoverContainer.vue'


export default {
    components: {
        'cover-container': CoverContainer,
    },
    data: function() {
        return {
            isAnyLink: true
        }
    }
}
</script>

<style scoped>
</style>
