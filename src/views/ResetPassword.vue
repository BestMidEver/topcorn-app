<template>
    <static-modal-container>
        <template slot="content">
            <div class="modal-header">
                <span class="modal-title h6">Change My Password</span>
            </div>
            <form @submit.prevent="reset">
                <div class="modal-body">
                    <custom-input v-model="formData.email" :alertMessage="mergeArrayWith(errors['email'], ' ')" type="email" class="mt-3" placeHolder="Email" icon="at" :required="true"/>
                    <custom-input v-model="formData.password" :alertMessage="mergeArrayWith(errors['password'], ' ')" type="password" class="mt-3" placeHolder="Password" icon="key" :required="true"/>
                    <custom-input v-model="formData.password_confirmation" type="password" class="mt-3" placeHolder="Password confirmation" icon="redo" :required="true"/>
                </div>
                <div class="modal-footer d-flex justify-content-end">
                    <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="loading">Change</button>
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
            formData: {
                email: '',
                password: '',
                password_confirmation: '', 
            },
            errors: {},
            loading: false
        }
    },
    computed: {
        token() { return this.$route.params.code }
    },
    methods: {
        reset() {
            this.loading = true
            axios.post(`${process.env.VUE_APP_API_URL}/resetPassword`, { ...{ token: this.token }, ...this.formData })
            .then(response => {
                alert('Your password is changed successfully. Now you can login with it.')
                this.$router.push('/login')
            }).catch(error => {
                this.errors = error.response.data.errors
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
.form-container{max-width: 500px;}
</style>
