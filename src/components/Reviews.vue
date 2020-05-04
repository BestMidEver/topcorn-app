<template>
    <div :class="expandStatus">
        <div v-for="review in 10" class="mt-3">
            <div class="d-flex justify-content-between pl-3 pl-md-1 pr-1">
                <div class="h6 d-flex align-items-center">izgzhen</div>
                <div class="h6">
                    <custom-button type="like" iconSize="22px" status="active" class="btn-sm btn-block px-lg-4 d-flex align-items-center">
                        <span class="ml-1 text-dark">15 likes</span>    
                    </custom-button>
                </div>
            </div>
            <div :id="'accordion' + review" class="px-3 px-md-1">
                <div>
                    <div :id="'collapsea' + review" :data-parent="'#accordion' + review" class="lead lead-small collapse">
                        <div>
                            <div>Perplexed by the storyline at the beginning, deeply attracted to the narratives of the intense rivalry between two actors in the main body of the show, and finally shocked by the revealed truth, or *The Prestige* in the end. This is one of the most mind-blowing mysteries that I've watched in recent years.
                                <br>
                                <br>One of the best part, I think, is how the characters of two young magicians are depicted -- through small but noticeable details like the facial expressions, one or two words, the novels et cetera.
                                <br>
                                <br>In fact, the title of the movie, even being explained by Cutter in the beginning, still puzzles me and I can't stopped thinking about the meaning of it. Not to mention other puzzles. But ultimately, I came to realize that the plot structure corresponds to a epic magic show as well.</div>
                        </div>
                        <div class="text-center pt-0">
                            <custom-button type="show-less" iconSize="22px" class="btn-lg border-0 showreview collapsed" data-toggle="collapse" :data-target="'#collapseb' + review" aria-expanded="true"></custom-button>
                        </div>
                    </div>
                </div>
                <div>
                    <div :id="'collapseb' + review" :data-parent="'#accordion' + review" class="lead lead-small collapse show">
                        <div>
                            <div>Perplexed by the storyline at the beginning, deeply attracted to the narratives of the intense rivalry between two actors in the main body of the show, and finally shocked by the revealed truth, or *The Prestige* in the end. This is one of the most mind-blowing mysteries that I've watched in recent y...</div>
                        </div>
                        <div>
                            <div class="text-center pt-1">
                                <custom-button type="text" iconSize="22px" class="btn-sm border-0 showreview collapsed" data-toggle="collapse" :data-target="'#collapsea' + review" aria-expanded="false">Read more</custom-button>
                            </div>
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
        expandStatus: {
            validator: value => ['expanded', 'compressed'].includes(value)
        },
    },
}
</script>

<style scoped>
.compressed > div:nth-child(n+3){
    display: none!important
}
.lead-small {
    font-size: 1rem;
}
</style>
