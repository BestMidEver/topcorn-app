<template>
    <div>
        <section-heading title="Recently visited" class="mt-3">
            <custom-button v-if="anyRecentlyVisited" type="text" class="btn-sm btn-block border-0" @click="clearRecentlyVisiteds(types)" :disabled="$store.state.loading.responseWaiting"><div class="one-line">Clear All</div></custom-button>
        </section-heading>
        <cards type="movie" :tcAllResults="allResults" :loading="$store.state.loading.pageLoading2" :boundedTo="['interactions/setMovieInteraction', 'recentlyVisited/setMovieInteraction']" class="mt-2"/>
    </div>
</template>

<script>
import SectionHeading from '@/components/SectionHeading.vue'
import CustomButton from '@/components/CustomButton.vue'
import Cards from '@/components/Cards.vue'
import recentlyVisited from './recentlyVisited'


export default {
    components: {
        'custom-button': CustomButton,
        'cards': Cards,
        'section-heading': SectionHeading,
    },
    mixins: [recentlyVisited],
    data() {
        return {
            types: 'movies'
        }
    },
}
</script>

<style scoped>
</style>
