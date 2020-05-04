<template>
    <cover-container coverSrc="https://image.tmdb.org/t/p/w1280/q2CtXYjp9IlnfBcPktNkBPsuAEO.jpg" profileSrc="https://image.tmdb.org/t/p/w300_and_h300_bestv2/xD4jTA3KmVp5Rq3aHcymL9DUGjD.jpg" :isOwnProfile="true">
        <template slot="right-text-first-row">
            <h5><span class="text-left text-light">Szofijjja <small>(Follows  you)</small></span></h5>
        </template>
        <template slot="right-text-second-row">
            <font-awesome-icon :icon="['fas', 'map-marker']"/> <font-awesome-icon :icon="['fas', 'map-marker']" class="ml-2"/> <font-awesome-icon :icon="['fas', 'map-marker']" class="ml-2"/> <font-awesome-icon :icon="['fas', 'map-marker']" class="ml-2"/>
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
