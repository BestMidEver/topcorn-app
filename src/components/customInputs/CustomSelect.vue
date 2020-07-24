<template>
    <div>
        <div v-if="$slots.default" style="position: relative" :style="{ 'min-height': buttonHeight, width: buttonWidth }">
            <slot></slot>
            <select style="position: absolute; left: 0; top: 0; opacity: .01" :style="{ height: buttonHeight, width: buttonWidth }" class="form-control form-control-sm" v-model="selected_" :disabled="disabled">
                <option v-for="(item, index) in items" :key="index + item + index">{{ item }}</option>
            </select>
        </div>
        <div v-else class="form-group">
            <label v-if="title" class="small text-secondary mb-1">{{ title }}</label>
            <div style="position: relative; height: 31px">
                <div style="position: absolute; left: 0; top: 0" class="form-control form-control-sm d-flex align-items-center h-100"><span class="d-flex flex-fill one-line-dots mr-1">{{ selectedsText }}</span> <span class="d-flex" style="margin-right: -0.1rem"><font-awesome-icon style="font-size: 4px" :icon="['fas', 'circle']"/></span></div>
                <select style="position: absolute; left: 0; top: 0; opacity: .01" class="form-control form-control-sm" v-model="selected_" :disabled="disabled">
                    <option v-for="item in items" :key="item">{{ item }}</option>
                </select>
            </div>
        </div>
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
        disabled: Boolean,
        buttonHeight: String,
        buttonWidth: String
    },
    data() {
        return {
        }
    },
    computed: {
        selected_: {
            get() {
                return this.selected
            },
            set(val) {
                this.$emit('update:selected', val)
            }
        },
        selectedsText() {
            return (['All', 'None'].includes(this.selected_) || this.disabled) ? '' : this.selected_
        }
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
