<template>
    <static-modal-container>
        <template slot="content">
            <div class="modal-header">
                <div class="modal-title h6">Register</div>
            </div>
            <form @submit.prevent="register">
                <div class="modal-body">
                    <div class="text-muted small"><font-awesome-icon icon="info-circle"/> Made up email addresses are acceptable too but in that case you can't restore a forgotten password.</div>
                    <custom-input v-model="formData.name" :alertMessage="mergeArrayWith(errors['name'], ' ')" type="text" class="mt-3" placeHolder="Username" icon="user" :required="true"/>
                    <custom-input v-model="formData.email" :alertMessage="mergeArrayWith(errors['email'], ' ')" type="email" class="mt-3" placeHolder="Email" icon="at" :required="true"/>
                    <custom-input v-model="formData.emailConfirmation" type="email" class="mt-3" placeHolder="Email confirmation" icon="redo" :required="true"/>
                    <custom-input v-model="formData.password" :alertMessage="mergeArrayWith(errors['password'], ' ')" type="password" class="mt-3" placeHolder="Password" icon="key" :required="true"/>
                    <custom-input v-model="formData.passwordConfirmation" type="password" class="mt-3" placeHolder="Password confirmation" icon="redo" :required="true"/>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <router-link to="/privacy-policy" class="btn btn-sm text-secondary border-0">Privacy Policy</router-link>
                    <button type="submit" class="btn btn-sm btn-primary border-0" :disabled="loading">Register</button>
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
    data: function() {
        return {
            pageTitle: 'Register',
            formData: {
                name: '',
                email: '',
                emailConfirmation: '',
                password: '',
                passwordConfirmation: '', 
            },
            errors: {},
            loading: false
        }
    },
    methods: {
        register() {
            this.loading = true
            this.$store.dispatch('auth/register', this.formData)
            .then(response => {
                alert('You have successfully created a new account. Now you can login with it.')
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
