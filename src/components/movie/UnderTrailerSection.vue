<template>
    <div class="d-flex flex-wrap justify-content-between">
        <div v-if="title" class="px-3 px-md-1">
            <div class="d-flex flex-column">
                <div>
                    <a class="text-dark" href="http://www.google.com/search?q=Glass 2019">
                        <h1 class="h5 pb-2 pt-3">{{ title }}</h1>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="allowedButtons.length > 0" class="d-flex flex-column mt-1 mt-md-1 px-1 col-12 col-md-auto ml-auto">
            <div id="under-trailer-button-container" class="d-flex flex-row justify-content-between text-center">
                <custom-button v-if="isButtonAllowed('watch-later')" type="watch-later" :style="{order: calcButtonIndex('watch-later')}" :borderRadius="calcButtonBorderRadius('watch-later')"
                    iconSize="22px" status="active" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Watch Later</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('seen')" type="seen" :style="{order: calcButtonIndex('seen')}" :borderRadius="calcButtonBorderRadius('seen')"
                    iconSize="22px" status="active4" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Seen</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('ban')" type="ban" :style="{order: calcButtonIndex('ban')}" :borderRadius="calcButtonBorderRadius('ban')"
                    iconSize="22px" status="" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Hide</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('share')" type="share" :style="{order: calcButtonIndex('share')}" :borderRadius="calcButtonBorderRadius('share')"
                    iconSize="22px" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Share</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('vote')" type="seen" :style="{order: calcButtonIndex('vote')}" :borderRadius="calcButtonBorderRadius('vote')"
                    iconSize="22px" status="active5" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Vote</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('last-seen')" type="last-seen" :style="{order: calcButtonIndex('last-seen')}" :borderRadius="calcButtonBorderRadius('last-seen')"
                    iconSize="22px" status="active" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Last Seen Episode</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('edit')" type="edit" :style="{order: calcButtonIndex('edit')}" :borderRadius="calcButtonBorderRadius('edit')"
                    iconSize="22px" status="" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Comment</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('follow')" type="follow" :style="{order: calcButtonIndex('follow')}" :borderRadius="calcButtonBorderRadius('follow')"
                    iconSize="22px" status="active" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Following</div>
                </custom-button>
                <custom-button v-if="isButtonAllowed('bell')" type="bell" :style="{order: calcButtonIndex('bell')}" :borderRadius="calcButtonBorderRadius('bell')"
                    iconSize="22px" status="active" class="btn-sm btn-block border-0 mt-0 px-lg-4">
                    <div class="one-line">Notify</div>
                </custom-button>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'custom-button': CustomButton,
    },
    props: {
        title: String,
        type: {
            validator: value => ['movie', 'series', 'series-season-info', 'series-episode-info', 'profile'].includes(value)
        },
    },
    data: function() {
        return {
            allowedItems: {
                'movie': ['watch-later', 'seen', 'ban', 'share'],
                'series': ['watch-later', 'seen', 'ban', 'share'],
                'series-season-info': [],
                'series-episode-info': ['last-seen', 'vote', 'edit'],
                'profile': ['follow', 'bell']
            },
        }
    },
    computed: {
        allowedButtons: function () { return this.allowedItems[this.type] },
    },
    methods: {
        isButtonAllowed(buttonType) { return this.allowedButtons.includes(buttonType) },
        calcButtonIndex(buttonType) { return this.allowedButtons.indexOf(buttonType) },
        calcButtonBorderRadius(buttonType) {
            const buttonIndex = this.calcButtonIndex(buttonType)
            const length = this.allowedButtons.length
            if(buttonIndex === 0) return 'left'
            if(buttonIndex === length -1) return 'right'
            return 'none'
        },
    }
}
</script>

<style scoped>
svg{ font-size: 22px; }
</style>
