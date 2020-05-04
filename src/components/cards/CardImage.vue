<template>
    <div class="image-container">
        <img v-if="loading" class="card-img-top" :class="(!preventDarken ? 'darken-cover ' : '') + size" :src="require('@/assets/2x3loading.png')"/>
        <img v-show="!loading" class="card-img-top" :class="(!preventDarken ? 'darken-cover ' : '') + size" :src="src" @error="$event.target.src = require('@/assets/200x300logo.png')" @load="loading = false"/>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        preventDarken: Boolean,
        size: {
            validator: value => ['narrow'/* , 'person' */].includes(value)
        }
    },
    data() {
        return {
            loading: true
        }
    },
    computed: {
        src() {
            if(this.isTrue(this.data.poster_path)) return `${process.env.VUE_APP_TMDB_POSTER_URL}${this.data.poster_path}`
            if(this.isTrue(this.data.profile_path)) return `${process.env.VUE_APP_TMDB_POSTER_URL}${this.data.profile_path}`
            if(this.isTrue(this.data.facebook_profile_path)) return `${this.data.facebook_profile_path}&height=450&width=300`
            if(this.isTrue(this.data.cover_path)) return `${process.env.VUE_APP_TMDB_SMALL_COVER_URL}${this.data.cover_path}`
            return require('@/assets/200x300logo.png')
        },
    },
}
</script>

<style scoped>
.narrow{
    height: 12vh!important;
    /* object-fit: cover;
    width: 100%; */
}
/* .person{
    height: 16vh!important;
    object-position: 50% 20%;
} */
.card-img-top{
    /* height: 30vh; */
    object-fit: cover;
    width: 100%;
}
</style>
