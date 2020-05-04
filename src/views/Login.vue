<template>
    <div class="d-flex justify-content-center">
        <form class="form-container w-100" @submit.prevent="login">
            <page-heading title="Login" :center="true" size="h6"/>
            <custom-input v-model="email" type="email" placeHolder="Email" icon="at" class="mt-3" :required="false"/>
            <custom-input v-model="password" :alertMessage="alertMessage" type="password" placeHolder="Password" icon="key" class="mt-3" :required="false"/>
            <submit-button name="Login"/>
            <a :href="forgotPasswordUrl" target="_blank" class="text-muted"><div class="text-center mt-4 small">I Forgot My Password</div></a>
        </form>
    </div>
</template>

<script>
import PageHeading from '@/components/PageHeading.vue'
import CustomInput from '@/components/CustomInput.vue'
import SubmitButton from '@/components/SubmitButton.vue'


export default {
    components: {
        'page-heading': PageHeading,
        'custom-input': CustomInput,
        'submit-button': SubmitButton,
    },
    data: function() {
        return {
            email: '',
            password: '',
            alertMessage: '',
            forgotPasswordUrl: `${process.env.VUE_APP_SERVER_URL}/password/reset`
        }
    },
    methods: {
        login() {
            this.$store.dispatch('auth/retrieveToken', {
                email: this.email,
                password: this.password,
            }).then(response => {
                this.$router.push({ name: 'Search' })
            }).catch(error => {
                this.alertMessage = error.response.data
            })
        }
    }
}
</script>

<style scoped>
.form-container{max-width: 500px;}
</style>
