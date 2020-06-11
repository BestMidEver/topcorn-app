<template>
    <div>
        <div class="d-flex justify-content-between pl-3 pl-md-1 pr-1">
            <div class="h6 d-flex align-items-center mb-0">
                <router-link v-if="to" :to="to" class="text-dark">{{ author }}</router-link><span v-else class="text-muted">{{ author }}</span> <five-star v-if="rate > 0" :rate="rate"/>
            </div>
            <div class="h6 mb-0">
                <div v-if="data.is_mine == 1" class="btn btn-sm btn-block px-lg-4 d-flex align-items-center" style="cursor: auto">
                    <font-awesome-icon :icon="['far', 'heart']" style="fontSize: 22px" class="text-muted"/>
                    <span v-if="data.count > 0" class="ml-1 text-dark small">{{ data.count }} {{ 'like' | plural(data.count, 'likes') }}</span>
                </div>
                <custom-button v-else type="like" iconSize="22px" :status="isLiked ? 'active' : ''" class="btn-sm btn-block px-lg-4 d-flex align-items-center"
                    @click="likeButtonClicked()" :disabled="$store.state.loading.responseWaiting">
                    <span v-if="data.count > 0" class="ml-1 text-dark">{{ data.count }} {{ 'like' | plural(data.count, 'likes') }}</span>
                </custom-button>
            </div>
        </div>
        <div :id="'accordion' + data.id" class="px-3 px-md-1">
            <div>
                <div :id="'collapsea' + data.id" :data-parent="'#accordion' + data.id" class="lead lead-small collapse">
                    <div v-html="newLinedContent"></div>
                    <div class="text-center pt-0">
                        <custom-button type="show-less" iconSize="22px" class="btn-lg border-0 showreview collapsed" data-toggle="collapse" :data-target="'#collapseb' + data.id" aria-expanded="true"></custom-button>
                    </div>
                </div>
            </div>
            <div>
                <div :id="'collapseb' + data.id" :data-parent="'#accordion' + data.id" class="lead lead-small collapse show">
                    <div>
                        <div v-html="short"></div>
                    </div>
                    <div>
                        <div class="text-center pt-1">
                            <custom-button v-if="isLong" type="text" iconSize="22px" class="btn-sm border-0 showreview collapsed" data-toggle="collapse" :data-target="'#collapsea' + data.id" aria-expanded="false">Read more</custom-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import FiveStar from './FiveStar.vue'
import urlGenerate from '@/mixins/urlGenerate'


export default {
    components: {
        'custom-button': CustomButton,
        'five-star': FiveStar,
    },
    mixins: [urlGenerate],
    props: {
        data: Object,
        boundedTo: Array,
    },
    computed: {
        //results() { return this.data.data },
        objName() { if(this.data.hasOwnProperty('obj_name')) return this.data.obj_name },
        to() {
            if(this.objName){
                if(['movie', 'series'].includes(this.data.type)) return this.movieSeriesUrl(this.data.type, this.data.movie_series_id)
                if(this.data.type === 'person') return this.personUrl(this.data.movie_series_id)
            }
            if(this.data.user_id) return this.userUrl(this.data.user_id)
        },
        author() {
            if(this.objName) return this.objName
            if(this.data.author) return this.data.author
            if(this.data.name) return this.data.name
        },
        newLinedContent() { return (this.data.content && this.data.content.replace(/(<([^>]+)>)/ig , "").replace(/\n/g , "<br>")) || '' },
        short() {
            if(this.newLinedContent.length > 200 || (this.newLinedContent.match(/<br>/g) || []).length > 2) return this.newLinedContent.replace(/<br>/g , " ").substring(0, 200) + '...'
            return this.newLinedContent
        },
        isLong() { return this.short !== this.newLinedContent },
        isLiked() { return this.data.is_liked == 1 },
        rate() { return this.data.rate },
    },
    methods: {
        likeButtonClicked() {
            const isLiked = this.isLiked
            this.$store.dispatch('noModals/likeReview', { data: this.data, boundedTo: this.boundedTo }).then(response => {
                if(isLiked) this.data.count--
                else this.data.count++
            })
        }
    }
}
</script>

<style scoped>
.lead-small {
    font-size: 1rem;
}
</style>
