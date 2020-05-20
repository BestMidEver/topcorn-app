<template>
    <div class="mt-2" :class="cardClass">
        <div class="card h-100 d-flex flex-column justify-content-between mx-1">
            <router-link class="card-link" :to="to" data-toggle="tooltip" data-placement="top" :data-original-title="title">
                <div class="position-relative text-center">
                    <div class="images">
                        <slot name="image"/>
                    </div>
                    <div class="card-over-layer d-none">
                        <slot name="over-layer-top"/>
                        <slot name="over-layer-bottom"/>
                    </div>
                    <div class="card-badge-layer">
                        <slot name="badge-top"/>
                        <slot name="badge-bottom"/>
                    </div>
                </div>
            </router-link>
            <slot name="text"/>
            <slot name="bottom-body"/>
            <slot name="footer"/>
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
.card a:hover .card-over-layer {
    display: flex!important;
}
.card a:hover .card-badge-layer {
    display: none!important;
}
.card a:hover .darken-cover {
    filter: brightness(30%);
}
.images > img:not(:first-child) { border-radius: 0; }
.images > img:first-child { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
</style>
