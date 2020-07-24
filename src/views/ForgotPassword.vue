<template>
    <static-modal-container>
        <template slot="content">
            <div class="modal-header">
                <span class="modal-title h6">I Forgot My Password</span>
            </div>
            <form @submit.prevent="sendEmail">
                <div class="modal-body">
                    <custom-input v-model="email" type="email" :alertMessage="mergeArrayWith(errors['email'], ' ')" class="mt-3" placeHolder="Email" icon="at" :required="true"/>
                </div>
                <div class="modal-footer d-flex justify-content-end">
                    <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="loading">Send Instructions</button>
                </div>
            </form>
        </template>
    </static-modal-container>
</template>

<script>
import CustomInput from '@/components/customInputs/CustomInput.vue'
import StaticModalContainer from '@/components/modals/StaticModalContainer.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


export default {
    components: {
        'custom-input': CustomInput,
        'static-modal-container': StaticModalContainer,
    },
    data() {
        return {
            email: '',
            errors: {},
            loading: false
        }
    },
    methods: {
        sendEmail() {
            this.loading = true
            axios.post(`${process.env.VUE_APP_API_URL}/sendResetPasswordEmail`, { email: this.email })
            .then(response => {
                this.email = ''
                this.errors = {}
                alert('The email must reach to the given address in couple of minutes max. It may end up in your spam folder as well. Please click the link at the email, in order to create a new password.')
            }).catch(error => {
                this.errors = error.response.data.errors
            }).then(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
</style>
