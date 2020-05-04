<template>
    <div class="w-100 px-1">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend">
                <span class="input-group-text bg-white">
                    <font-awesome-icon v-if="icon" :icon="icon"/>
                </span>
            </div>
            <input v-model="inputVal" :type="type" :placeholder="placeHolder" class="form-control rounded-right" style="flex: 1" :required="required"/>
            <div v-if="isClearVisible" class="input-group-append">
                <custom-button type="text" class="btn-sm btn-block border-0" @click="clearInput"><div class="one-line">{{ clearMessage }}</div></custom-button>
            </div>
        </div>
        <div class="text-danger m-0" v-if="alertMessage"><font-awesome-icon icon="exclamation-triangle"/> {{ alertMessage }}</div>
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
                //if (this.timeout) clearTimeout(this.timeout)
                //this.timeout = setTimeout(() => {
                    this.$emit('input', val)
                //}, 1000)
            }
        },
        isClearVisible() { return this.clearMessage && this.isTrue(this.inputVal) }
    },
    methods: {
        clearInput() { /* clearTimeout(this.timeout); this.$emit('input', '') */ this.inputVal = '' }
    }
}
</script>

<style scoped>
</style>
