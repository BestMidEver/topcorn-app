<template>
    <div class="d-flex justify-content-center">
        <form class="form-container w-100" @submit.prevent="register">
            <page-heading title="Register" :center="true" size="h6"/>
            <custom-input v-model="formData.name" :alertMessage="mergeArrayWith(errors['name'], ' ')" type="text" class="mt-3" placeHolder="Username" icon="user" :required="true"/>
            <custom-input v-model="formData.email" :alertMessage="mergeArrayWith(errors['email'], ' ')" type="email" class="mt-3" placeHolder="Email" icon="at" :required="true"/>
            <custom-input v-model="formData.emailConfirmation" type="email" class="mt-3" placeHolder="Email confirmation" icon="redo" :required="true"/>
            <custom-input v-model="formData.password" :alertMessage="mergeArrayWith(errors['password'], ' ')" type="password" class="mt-3" placeHolder="Password" icon="key" :required="true"/>
            <custom-input v-model="formData.passwordConfirmation" type="password" class="mt-3" placeHolder="Password confirmation" icon="redo" :required="true"/>
            <submit-button name="Register"/>
        </form>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import PageHeading from '@/components/PageHeading.vue'
import CustomInput from '@/components/CustomInput.vue'
import SubmitButton from '@/components/SubmitButton.vue'


export default {
    components: {
        'progress-bar': ProgressBar,
        'page-heading': PageHeading,
        'custom-input': CustomInput,
        'submit-button': SubmitButton,
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
            errors: {}
        }
    },
    methods: {
        register() {
            this.$store.dispatch('auth/register', this.formData)
            .then(response => {
                this.$router.push({ name: 'Login' })
            }).catch(error => {
                this.errors = error.response.data.errors
            })
        }
    }
}
</script>

<style scoped>
.form-container{max-width: 500px;}
</style>
