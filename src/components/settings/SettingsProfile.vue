<template>
    <div>
        <user-cover-section :data="tcResponse" class="mt-1 mt-md-4 cover-container" :pageLoading="loading" :isFullScreen="true"/>
        <form @submit.prevent="save">
            <div class="modal-body pt-0">
                <custom-input v-model="username" type="text" title="User Name" :required="true" :disabled="loading"/>
                <custom-select :items="coverPhotoItems" title="Cover Photo" :selected.sync="coverPhoto" class="mt-3" :disabled="loading"/>
                <custom-select :items="profilePhotoItems" title="Profile Photo" :selected.sync="profilePhoto" class="mt-3" :disabled="loading"/>
                <custom-input v-model="facebookLink" type="text" prependText="www.facebook.com/" title="Facebook" class="mt-3" :disabled="loading"/>
                <custom-input v-model="twitterLink" type="text" prependText="twitter.com/" title="Twitter" class="mt-3" :disabled="loading"/>
                <custom-input v-model="instagramLink" type="text" prependText="www.instagram.com/" title="Instagram" class="mt-3" :disabled="loading"/>
                <custom-input v-model="youtubeLink" type="text" prependText="www.youtube.com/channel/" title="Youtube" class="mt-3" :disabled="loading"/>
                <custom-input v-model="homePage" type="text" prependText="https://" title="Home Page Url" class="my-3" :disabled="loading"/>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <button type="button" class="btn btn-sm text-secondary border-0" @click="revert()" :disabled="saveDisabled">Revert to Last Save</button>
                <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="saveDisabled">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import UserCoverSection from '@/components/user/UserCoverSection.vue'
import urlGenerate from '@/mixins/urlGenerate'
import CustomSelect from '@/components/customInputs/CustomSelect.vue'
import CustomInput from '@/components/customInputs/CustomInput.vue'
import reverter from './reverter.js'


export default {
    components: {
        'user-cover-section': UserCoverSection,
        'custom-select': CustomSelect,
        'custom-input': CustomInput,
    },
    mixins: [urlGenerate, reverter],
    data() {
        return {
            axiosRandom: '',
            axiosRandom2: '',
            coverPictureResponse: [],
            profilePictureResponse: {cast:[]},
            tempPerson: {}
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading && this.$store.state.loading.pageLoading2 },
        coverPhotoItems() { return ['Current One', ...this.legendaryMovies] },
        profilePhotoItems() { return [...new Set(['Current One', ...(this.tempPerson.name ? [this.tempPerson.name] : []), ...this.legendaryActors])] },
        legendaryMovies() { return this.coverPictureResponse.map(movie => movie.title) },
        legendaryActors() { return this.profilePictureResponse && this.profilePictureResponse.cast.map(person => person.name) },
        username: {
            get() { return this.tcResponse && this.tcResponse.name || '' },
            set(val) { this.tcResponse.name = val }
        },
        coverPhoto: {
            get() { return this.tcResponse && this.tcResponse.cover_pic == JSON.parse(this.savedResponse).cover_pic ? 'Current One' : (this.coverPictureResponse.find(movie => movie.cover_path === this.tcResponse.cover_pic).title || '') },
            set(val) { this.tcResponse.cover_pic = val === 'Current One' ? JSON.parse(this.savedResponse).cover_pic : this.coverPictureResponse.find(movie => movie.title === val).cover_path }
        },
        profilePhoto: {
            get() { return this.tcResponse && this.tcResponse.profile_pic == JSON.parse(this.savedResponse).profile_pic ? 'Current One' : (this.profilePictureResponse.cast.find(person => person.profile_path === this.tcResponse.profile_pic) || this.tempPerson).name || '' },
            set(val) {
                if(val !== 'Current One') this.tempPerson = this.profilePictureResponse.cast.find(person => person.name === val)
                this.tcResponse.profile_pic = val === 'Current One' ? JSON.parse(this.savedResponse).profile_pic : this.tempPerson.profile_path
            }
        },
        facebookLink: {
            get() { return this.tcResponse && this.tcResponse.facebook_link || '' },
            set(val) { this.tcResponse.facebook_link = val }
        },
        twitterLink: {
            get() { return this.tcResponse && this.tcResponse.twitter_link || '' },
            set(val) { this.tcResponse.twitter_link = val }
        },
        instagramLink: {
            get() { return this.tcResponse && this.tcResponse.instagram_link || '' },
            set(val) { this.tcResponse.instagram_link = val }
        },
        youtubeLink: {
            get() { return this.tcResponse && this.tcResponse.youtube_link || '' },
            set(val) { this.tcResponse.youtube_link = val }
        },
        homePage: {
            get() { return this.tcResponse && this.tcResponse.another_link_url && this.tcResponse.another_link_url.replace('https://','') || '' },
            set(val) { this.tcResponse.another_link_url = val }
        },
    },
    watch: {
        coverPhoto(val) { if(val !== 'Current One') this.getProfilePics() }
    },
    created() {
        this.getObjData()
    },
    methods: {
        getObjData() {
            this.getSimpleUser()
            this.getCoverPics()
        },
        getSimpleUser() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/get', this.simpleUserData())
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tcResponse = response.data
                    this.saveResponse()
                }
            }).catch(error => {
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading')
            })
        },
        getCoverPics() {
            this.$store.dispatch('loading/startPageLoading2')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            this.$store.dispatch('request/get', this.getCoverPicsUrl())
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.coverPictureResponse = response.data
                }
            }).catch(error => {
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading2')
            })
        },
        getProfilePics() {
            this.$store.dispatch('loading/startPageLoading3')
            const axiosRandom = this.randomString(20)
            this.axiosRandom3 = axiosRandom
            this.$store.dispatch('request/get', this.getProfilePicsUrl(this.coverPictureResponse.find(movie => movie.cover_path === this.tcResponse.cover_pic).movie_id))
            .then(response => {
                if(axiosRandom === this.axiosRandom3) {
                    this.profilePictureResponse = response.data
                }
            }).catch(error => {
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading3')
            })
        },
        save() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom = axiosRandom
            this.$store.dispatch('request/post', { url: this.setUser(), data: { type: 'profile', ...this.tcResponse } })
            .then(response => {
                if(axiosRandom === this.axiosRandom) {
                    this.tcResponse = response.data
                    this.saveResponse()
                    alert('Your profile settings have been saved successfully.')
                }
            }).catch(error => {
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading')
            })
        }
    },
}
</script>

<style scoped>
@media (min-width: 576px) {
    .cover-container {
        margin: 0 -1px
    }
}
</style>
