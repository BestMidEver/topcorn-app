<template>
    <div>
        <form @submit.prevent="save">
            <div class="modal-body">
                <custom-select :items="notificationItems" title="System Updates" :selected.sync="systemNotification" :disabled="loading"/>
                <custom-select :items="notificationItems" title="New Episode Reminder" :selected.sync="reminderNotification" :disabled="loading"/>
                <custom-select :items="notificationItems" title="User Interaction" :selected.sync="userInteractionNotification" :disabled="loading"/>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <button type="button" class="btn btn-sm text-secondary border-0" @click="revert()" :disabled="saveDisabled">Revert to Last Save</button>
                <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="saveDisabled">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import urlGenerate from '@/mixins/urlGenerate'
import CustomInput from '@/components/customInputs/CustomInput.vue'
import CustomSelect from '@/components/customInputs/CustomSelect.vue'
import reverter from './reverter.js'

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


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
            notificationItems: ["Don't Do Anything", 'Send Notification', 'Send Notification & Email']
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        systemNotification: {
            get() { return this.tcResponse && this.notificationItems[this.tcResponse.when_system_change] || '' },
            set(val) { this.tcResponse.when_system_change = this.notificationItems.findIndex(notificationItem => notificationItem === val) }
        },
        reminderNotification: {
            get() { return this.tcResponse && this.notificationItems[this.tcResponse.when_automatic_notification] || '' },
            set(val) { this.tcResponse.when_automatic_notification = this.notificationItems.findIndex(notificationItem => notificationItem === val) }
        },
        userInteractionNotification: {
            get() { return this.tcResponse && this.notificationItems[this.tcResponse.when_user_interaction] || '' },
            set(val) { this.tcResponse.when_user_interaction = this.notificationItems.findIndex(notificationItem => notificationItem === val) }
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
            axios.get(this.simpleUserData())
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
            axios.post(this.setUser(), { type: 'profile', ...this.tcResponse })
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.tcResponse = response.data
                    this.saveResponse()
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
