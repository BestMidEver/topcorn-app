<template>
    <full-screen-container :isFullScreen="isFullScreen">
        <section-heading title="Comments" :expandStatus="isFullScreen ? 'expanded' : 'compressed'" :class="isFullScreen ? 'pt-3' : 'mt-5'">
            <custom-button type="text" :status="isFullScreen ? 'active' : ''" class="btn-sm btn-block border-0 mt-0 px-lg-4"><div class="one-line">Say Something</div></custom-button>
            <custom-button type="text" :status="isFullScreen ? 'active' : ''" class="btn-sm btn-block border-0 mt-0 px-lg-4"><div class="one-line">Show All</div></custom-button>
        </section-heading>
        <reviews :expandStatus="isFullScreen ? 'expanded' : 'compressed'"/>
    </full-screen-container>
</template>

<script>
import FullScreenContainer from '@/components/FullScreenContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CustomButton from '@/components/CustomButton.vue'
import Reviews from '@/components/Reviews.vue'


export default {
    components: {
        'full-screen-container': FullScreenContainer,
        'section-heading': SectionHeading,
        'custom-button': CustomButton,
        'reviews': Reviews,
    },
    data: function() {
        return {
            isFullScreen: false
        }
    },
}
</script>

<style scoped>
</style>