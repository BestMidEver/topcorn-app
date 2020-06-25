<template>
    <static-modal-container>
        <template slot="content">
            <div class="modal-header">
                <span class="modal-title h6">Login</span>
            </div>
            <form @submit.prevent="login">
                <div class="modal-body">
                    <custom-input v-model="email" type="email" placeHolder="Email" icon="at" :required="false"/>
                    <custom-input v-model="password" :alertMessage="alertMessage" type="password" placeHolder="Password" icon="key" class="mt-3" :required="false"/>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <a :href="forgotPasswordUrl" target="_blank" class="btn btn-sm text-secondary border-0">I Forgot My Password</a>
                    <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="loading">Login</button>
                </div>
            </form>
        </template>
    </static-modal-container>
</template>

<script>
import CustomInput from '@/components/customInputs/CustomInput.vue'
import StaticModalContainer from '@/components/modals/StaticModalContainer.vue'


export default {
    components: {
        'custom-input': CustomInput,
        'static-modal-container': StaticModalContainer,
    },
    data() {
        return {
            email: '',
            password: '',
            alertMessage: '',
            forgotPasswordUrl: `${process.env.VUE_APP_SERVER_URL}/password/reset`,
            loading: false
        }
    },
    methods: {
        login() {
            this.loading = true
            this.$store.dispatch('auth/retrieveToken', {
                email: this.email,
                password: this.password,
            }).then(response => {
                this.$router.replace(process.env.VUE_APP_HOME_TO)
            }).catch(error => {
                this.alertMessage = error.response.data
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
.form-container{max-width: 500px;}
</style>
