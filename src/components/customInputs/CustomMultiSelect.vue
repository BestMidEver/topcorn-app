<template>
    <div class="form-group">
        <label v-if="title" class="small text-secondary mb-1">{{ title }}</label>
        <div style="position: relative; height: 31px"><!--  :style="{ height: clicked ? '90px' : '31px' }" -->
            <div style="position: absolute; left: 0; top: 0" class="form-control form-control-sm d-flex align-items-center h-100"><span class="d-flex flex-fill one-line-dots mr-1">{{ selectedsText }}</span> <span class="d-flex" style="margin-right: -0.1rem"><font-awesome-icon style="font-size: 10px" :icon="['fas', 'ellipsis-v']"/></span></div>
            <select style="position: absolute; left: 0; top: 0; opacity: .01" class="form-control form-control-sm" v-model="selected_" multiple :disabled="disabled"><!--  @focus="expand()" @blur="unexpand()" :style="{ opacity: clicked ? 100 : .01 }" -->
                <option v-for="item in items" :key="item">{{ item }}</option>
            </select>
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
        disabled: Boolean
    },
    data() {
        return {
            //clicked: false,
        }
    },
    computed: {
        selected_: {
            get() {
                return Array.isArray(this.selected) ? this.selected : [this.selected]
            },
            set(val) {
                if(val.includes('None')) val = 'None'
                if(val.includes('All')) val = 'All'
                this.$emit('update:selected', val)
            }
        },
        selectedsText() {
            let text = this.mergeArrayWith(this.selected_)
            return ['All', 'None'].includes(text) ? '' : text
        }
    },
    methods: {
        /* expand() {
            this.clicked = true
        },
        unexpand() {
            this.clicked = false
        } */
    },
    /* watch selected() {
        this.unexpand()
    } */
}
</script>

<style scoped>
.form-control {
    height: unset;
}
</style>
