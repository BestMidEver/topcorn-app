<template>
    <component v-if="!data.disabled" :is="data.type" :items="items" :title="title" :selected.sync="selected_"/>
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
                if(this.data.type === 'custom-select' && this.data.items.findIndex(item => item == this.selected) === -1) this.$emit('update:selected', this.data.default)
                return this.selected || this.data.default
            },
            set(val) {
                this.$emit('update:selected', val)
                this.$emit('filterChanged', { ...this.data, selected: val })
            }
        },
        items() { return this.data && this.data.items || [] },
        title() { return this.data && this.data.title || '' }
    },
}
</script>

<style scoped>
</style>
