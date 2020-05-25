<template>
    <div>
        <div :id="'accordion' + id">
            <div>
                <div :id="'collapsea' + id" :data-parent="'#accordion' + id" class="collapse">
                    <div v-html="newLinedContent"></div>
                    <div class="text-center pt-0" style="margin-bottom: -0.5rem;">
                        <custom-button type="show-less" iconSize="22px" class="btn-lg border-0 collapsed" data-toggle="collapse" :data-target="'#collapseb' + id" aria-expanded="true"></custom-button>
                    </div>
                </div>
            </div>
            <div>
                <div :id="'collapseb' + id" :data-parent="'#accordion' + id" class="collapse show">
                    <div>
                        <div v-html="short"></div>
                    </div>
                    <div v-if="isLong">
                        <div class="text-center pt-1" style="margin-bottom: -0.5rem;">
                            <custom-button type="text" iconSize="22px" class="btn-sm border-0 collapsed" data-toggle="collapse" :data-target="'#collapsea' + id" aria-expanded="false">Read more</custom-button>
                        </div>
                    </div>
                </div>
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
        text: String,
        maxChar: {
            type: Number,
            default: 400
        }
    },
    data() {
        return {
            isExpanded: false,
            id: `et-${this.randomString(20)}`
        }
    },
    computed: {
        newLinedContent() { return (this.text && this.text.replace(/(<([^>]+)>)/ig , "").replace(/\n/g , "<br>")) || '' },
        short() {
            if(this.newLinedContent.length > this.maxChar || (this.newLinedContent.match(/<br>/g) || []).length > 2) return this.newLinedContent.replace(/<br>/g , " ").substring(0, this.maxChar) + '...'
            return this.newLinedContent
        },
        isLong() { return this.short !== this.newLinedContent },
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
