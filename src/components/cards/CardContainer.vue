<template>
    <div class="mt-2" :class="cardClass">
        <div class="card h-100 d-flex flex-column justify-content-between mx-1 card-border">
            <div class="card-profile">
                <div class="position-relative text-center">
                    <div class="images">
                        <slot name="image" class="bg-white"/>
                    </div>
                    <div class="card-over-layer d-none bg-white">
                        <slot name="over-layer-top"/>
                        <slot name="over-layer-bottom"/>
                    </div>
                    <div class="card-badge-layer bg-white">
                        <slot name="badge-top"/>
                        <slot name="badge-bottom"/>
                    </div>
                </div>
            </div>
            <router-link class="card-link" :to="to">
                <slot name="text" class="bg-white"/>
                <slot name="bottom-body" class="bg-white"/>
            </router-link>
            <slot name="footer" style="background-color: var(--footer-gray)"/>
        </div>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'


export default {
    props: {
        type: {
            validator: value => ['small'/* , 'big' */].includes(value)
        },
        data: Object,
        cardType: String
    },
    mixins: [urlGenerate],
    computed: {
        cardClass() {
            if(this.type === 'small') return 'col-4 col-sm-3 col-md-2'
            /* if(this.type === 'big') return 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2' */
            return 'col-6 col-md-4 col-lg-3 col-xl-2'
        },
        title() { return this.data.title },
        id() { return this.data.id },
        to() {
            if(this.cardType === 'person') return this.personUrl(this.id)
            if(this.cardType === 'movie') return this.movieSeriesUrl('movie', this.id)
            if(this.cardType === 'series') return this.movieSeriesUrl('series', this.id)
            if(this.cardType === 'user') return this.userUrl(this.id)
        },
        getLastSeenEpisode() {
            
        }
    }
}
</script>

<style>
.card-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
}
.btn-verydark {
    background: var(--very-dark-color);
    border-color: var(--very-dark-color);
}
.card .card-profile:hover .card-over-layer {
    display: flex!important;
}
.card .card-profile:hover .card-badge-layer {
    display: none!important;
}
.card .card-profile:hover .darken-cover {
    filter: brightness(30%);
}
.images > img:not(:first-child) { border-radius: 0; }
.images > img:first-child { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
</style>
