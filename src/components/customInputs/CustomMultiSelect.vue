<template>
    <div class="form-group">
        <label v-if="title" class="small text-secondary mb-1">{{ title }}</label>
        <select class="form-control form-control-sm" v-model="selected_" multiple>
            <option v-for="item in items" :key="item">{{ item }}</option>
        </select>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        items: Array,
        title: String,
        selected: [Array, Boolean, String, Number, Object],
    },
    data() {
        return {
        }
    },
    computed: {
        selected_: {
            get() {
                return Array.isArray(this.selected) ? this.selected : [this.selected]
            },
            set(val) {
                this.$emit('update:selected', val)
            }
        }
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
