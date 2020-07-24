<template>
    <div>
        <form @submit.prevent="save">
            <div class="modal-body">
                <custom-select :items="itemsPerPageItems" title="Items Per Page" :selected.sync="itemsPerPage" :disabled="loading"/>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <button type="button" class="btn btn-sm text-secondary border-0" @click="revert()" :disabled="saveDisabled">Revert to Last Save</button>
                <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="saveDisabled">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import CustomInput from '@/components/customInputs/CustomInput.vue'
import CustomSelect from '@/components/customInputs/CustomSelect.vue'
import reverter from './reverter.js'


export default {
    components: {
        'custom-input': CustomInput,
        'custom-select': CustomSelect,
    },
    mixins: [urlGenerate, reverter],
    data() {
        return {
            axiosRandom: '',
            axiosRandom2: '',
            itemsPerPageItems: [12, 24, 48]
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        itemsPerPage: {
            get() { return this.tcResponse && this.tcResponse.pagination || '' },
            set(val) { this.tcResponse.pagination = val }
        },
    },
    created() {
        this.getObjData()
    },
    methods: {
        getObjData() {
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
        save() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            this.$store.dispatch('request/post', { url: this.setUser(), data: { type: 'profile', ...this.tcResponse } })
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.tcResponse = response.data
                    this.saveResponse()
                    alert('Your pagination setting has been saved successfully.')
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
</style>
