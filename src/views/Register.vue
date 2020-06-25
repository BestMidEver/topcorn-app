<template>
    <static-modal-container>
        <template slot="content">
            <div class="modal-header">
                <span class="modal-title h6">Register</span>
            </div>
            <form @submit.prevent="register">
                <div class="modal-body">
                    <custom-input v-model="formData.name" :alertMessage="mergeArrayWith(errors['name'], ' ')" type="text" class="mt-3" placeHolder="Username" icon="user" :required="true"/>
                    <custom-input v-model="formData.email" :alertMessage="mergeArrayWith(errors['email'], ' ')" type="email" class="mt-3" placeHolder="Email" icon="at" :required="true"/>
                    <custom-input v-model="formData.emailConfirmation" type="email" class="mt-3" placeHolder="Email confirmation" icon="redo" :required="true"/>
                    <custom-input v-model="formData.password" :alertMessage="mergeArrayWith(errors['password'], ' ')" type="password" class="mt-3" placeHolder="Password" icon="key" :required="true"/>
                    <custom-input v-model="formData.passwordConfirmation" type="password" class="mt-3" placeHolder="Password confirmation" icon="redo" :required="true"/>
                </div>
                <div class="modal-footer d-flex justify-content-end">
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
                this.$router.push({ name: 'Login' })
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
