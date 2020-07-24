<template>
    <div>
        <label v-if="title" class="small text-secondary mb-1">{{ title }}</label>
        <div class="input-group input-group-sm">
            <div v-if="isAnyTrue([icon, prependText])" class="input-group-prepend">
                <span class="input-group-text bg-white">
                    <font-awesome-icon v-if="icon" :icon="icon"/>
                    <span v-if="prependText">{{ prependText }}</span>
                </span>
            </div>
            <input v-model="inputVal" :type="type" :placeholder="placeHolder" class="form-control rounded-right" style="flex: 1" :required="required" :disabled="disabled"
                @focus="hideNavs()" @blur="showNavs()" @keyup.enter="$event.target.blur()" @input="inputVal = $event.target.value"/>
            <div v-if="isClearVisible" class="input-group-append">
                <custom-button type="text" class="btn-sm btn-block border-0" @click="clearInput"><div class="one-line">{{ clearMessage }}</div></custom-button>
            </div>
        </div>
        <div class="text-danger m-0" v-if="alertMessage"><font-awesome-icon icon="exclamation-triangle"/> {{ capitalizeFirstLetter(alertMessage) }}</div>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'custom-button': CustomButton,
    },
    props: {
        required: Boolean,
        placeHolder: String,
        type: { validator: value => ['text', 'email', 'password'].includes(value) },
        value: [String],
        icon: String,
        alertMessage: String,
        clearMessage: String,
        title: String,
        prependText: String,
        disabled: Boolean
    },
    data() {
        return {
            //timeout: 0
        }
    },
    computed: {
        inputVal: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        isClearVisible() { return this.clearMessage && this.isTrue(this.inputVal) }
    },
    methods: {
        clearInput() { this.inputVal = '' },
        hideNavs() {    
            $('#the-body').addClass('mt-0')
            $('#navigation-bar').hide()
        },
        showNavs() {
            $('#the-body').removeClass('mt-0')
            $('#navigation-bar').show()
        },
    }
}
</script>

<style scoped>
</style>
