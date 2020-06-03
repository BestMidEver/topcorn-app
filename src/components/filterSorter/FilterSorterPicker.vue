<template>
    <div :is="data.type" :items="items" :title="title" :selected.sync="selected_"/>
</template>

<script>
import CustomSelect from '@/components/customInputs/CustomSelect.vue'
import CustomMultiSelect from '@/components/customInputs/CustomMultiSelect.vue'


export default {
    components: {
        'custom-select': CustomSelect,
        'custom-multi-select': CustomMultiSelect
    },
    props: {
        data: Object,
        selected: [Array, Boolean, String, Number, Object]
    },
    data() {
        return {
        }
    },
    computed: {
        selected_: {
            get() {
                return this.selected || this.data.default
            },
            set(val) {
                this.$emit('update:selected', val)
            }
        },
        items() { return this.data && this.data.items || [] },
        title() { return this.data && this.data.title || '' }
    },
}
</script>

<style scoped>
</style>
