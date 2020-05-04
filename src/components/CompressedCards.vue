<template>
    <full-screen-container :isFullScreen="isExpanded" :id="containerId">
        <section-heading :title="title" :expandStatus="isExpanded ? 'expanded' : 'compressed'" :class="isExpanded ? 'pt-1' : (top || 'mt-5')">
            <custom-button type="text" :status="isExpanded ? 'active' : ''" class="btn-sm btn-block border-0 mt-0 px-lg-4" :class="buttonClass" @click="expandButtonClick()"><div class="one-line">{{ expandTitle }}</div></custom-button>
        </section-heading>
        <slot name="tabs" v-if="isExpanded"></slot>
        <cards :type="type" :items="[]" :expandStatus="isExpanded ? 'expanded' : 'compressed'" :isCardColumns="isCardColumns" class="mt-2"/>
    </full-screen-container>
</template>

<script>
import FullScreenContainer from '@/components/FullScreenContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import Cards from '@/components/Cards.vue'
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'full-screen-container': FullScreenContainer,
        'section-heading': SectionHeading,
        'cards': Cards,
        'custom-button': CustomButton,
    },
    props: {
        title: String,
        expandTitle: String,
        isFullScreen: Boolean,
        isCardColumns: Boolean,
        top: String,
        type: {
            validator: value => ['movie', 'series', 'person', 'list', 'user', 'profile-image-card'].includes(value)
        },
    },
    data: function() {
        return {
            containerId: 'fs' + this.randomString(),
            dataLength: 12,
            isExpanded: this.isTrue(this.isFullScreen),
            /* previousScrollPosition: 0,
            previousItemOffset: 0,
            previousHeight: 0 */
        }
    },
    computed: {
        buttonClass: function() {
            if(['movie', 'series', 'list'].includes(this.type)) {
                if(this.dataLength < 3) return 'd-none'
                if(this.dataLength < 4) return 'd-md-none'
                if(this.dataLength < 5) return 'd-lg-none'
                if(this.dataLength < 7) return 'd-xl-none'
                return ''
            }
            if(this.type === 'person') {
                if(this.dataLength < 4) return 'd-none'
                if(this.dataLength < 5) return 'd-sm-none'
                if(this.dataLength < 7) return 'd-md-none'
                return ''
            }
            if(['profile-image-card'].includes(this.type)) {
                if(this.dataLength < 3) return 'd-none'
                if(this.dataLength < 4) return 'd-sm-none'
                return ''
            }
        }
    },
    methods: {
        expandButtonClick() {
            if(this.isExpanded) this.compress()
            else this.expand()
        },
        expand() {
            /* this.previousItemOffset = $('#' + vm.containerId)[0].offsetTop
            $('.body').scrollTop( $('#' + vm.containerId)[0].offsetTop)
            this.previousHeight = $('.body')[0].scrollHeight
            vm.isExpanded = true */
            /* this.previousScrollPosition = $('.body').scrollTop()
            let vm = this
            $('.body').animate({ scrollTop: $('#' + vm.containerId)[0].offsetTop }, 'fast', () => vm.isExpanded = true); */
            this.isExpanded = true
        },
        compress() {
            this.isExpanded = false
            $('.body').scrollTop(this.previousScrollPosition)
            /* $('.body').height(this.previousHeight)
            $('.body').animate({ scrollTop: this.previousScrollPosition }, 'fast');
            this.isExpanded = false
            $('.body').animate({ scrollTop: this.previousScrollPosition }, 'fast', () => $('.body').removeAttr('height')) */
        }
    }
}
</script>

<style scoped>
</style>