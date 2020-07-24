<template>
    <div>
        <form @submit.prevent="save">
            <div class="modal-body">
                <custom-input v-model="email" type="text" title="Email" :disabled="true"/>
                <custom-input v-model="currentPassword" type="password" title="Current Password" class="mt-3" :alertMessage="errors && errors.current_password && errors.current_password[0]" :required="true" :disabled="loading"/>
                <custom-input v-model="newPassword" type="password" title="New Password" class="mt-3" :alertMessage="errors && errors.new_password && errors.new_password[0]" :required="true" :disabled="loading"/>
                <custom-input v-model="comfirmPassword" type="password" title="New Password Confirmation" class="my-3" :required="true" :disabled="loading"/>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <button type="button" class="btn btn-sm text-secondary border-0" @click="reset()" :disabled="loading">Cancel</button>
                <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="saveDisabled">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import CustomInput from '@/components/customInputs/CustomInput.vue'


export default {
    components: {
        'custom-input': CustomInput,
    },
    mixins: [urlGenerate],
    data() {
        return {
            axiosRandom: '',
            axiosRandom2: '',
            tcResponse: {},
            currentPassword: '',
            newPassword: '',
            comfirmPassword: '',
            errors: {}
        }
    },
    computed: {
        loading() { return this.$store.state.loading.pageLoading },
        saveDisabled() { return this.loading || !this.currentPassword || !this.newPassword || !this.comfirmPassword },
        email() { return this.tcResponse && this.tcResponse.email },
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
                }
            }).catch(error => {
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading')
            })
        },
        reset() { this.currentPassword = this.newPassword = this.comfirmPassword = '' },
        save() {
            this.$store.dispatch('loading/startPageLoading')
            const axiosRandom = this.randomString(20)
            this.axiosRandom2 = axiosRandom
            this.$store.dispatch('request/postWithErrors', { url: this.setUser(), data: { type: 'password', current_password: this.currentPassword, new_password: this.newPassword, new_password_confirmation: this.comfirmPassword } })
            .then(response => {
                if(axiosRandom === this.axiosRandom2) {
                    this.errors = {}
                    this.reset()
                    alert('Your password has been changed successfully.')
                }
            }).catch(error => {
                this.errors = error.response.data.errors
            }).then(() => {
                this.$store.dispatch('loading/finishPageLoading')
            })
        }
    },
}
</script>

<style scoped>
</style>
