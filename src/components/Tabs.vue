<template>
    <div :id="tabId" class="tab">
        <!-- Mobile tab d-md-none-->
        <div class=" d-flex justify-content-center mobile-container">
            <button v-for="(tab, index) in items" :key="tab" :id="tabId + index"
                class="btn btn-link border-no-radius text-sm-center text-muted text-no-decoration" :class="index === active ? 'active' : ''" @click="active = index" :disabled="disabled">{{ tab }}</button>
        </div>

        <!-- Larger Screen tab d-md-inline-->
        <div class="d-none ">
            <ul class="nav justify-content-md-center">
                <li v-for="(tab, index) in items" :key="'md' + tab" class="nav-item">
                    <button class="btn btn-link nav-link text-muted" :class="index === active ? 'active' : ''" @click="active = index" :disabled="disabled">{{ tab }}</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
        activeIndex: Number,
        activeTitle: String,
        itemTypes: Array,
        activeType: [String, Number],
        disabled: Boolean
    },
    data: function() {
        return {
            tabId: 'tab' + this.randomString()
        }
    },
    computed: {
        active: {
            get() {
                if(typeof this.activeIndex !== 'undefined') return this.activeIndex
                if(typeof this.activeTitle !== 'undefined') return this.items.findIndex(item => item === this.activeTitle)
                if(typeof this.activeType !== 'undefined') return this.itemTypes.findIndex(item => item === this.activeType)
            },
            set(val) {
                this.$emit('update:activeIndex', val)
                this.$emit('update:activeTitle', this.items[val])
                if(typeof this.activeType !== 'undefined') this.$emit('update:activeType', this.itemTypes[val])
                this.centerTab()
            }
        },
    },
    watch: {
        items() { this.centerTab() },
        active() { this.centerTab() }
    },
    mounted: function () {
        this.centerTab()
    },
    methods: {
        centerTab() {
            setTimeout(() => {
                $('#' + this.tabId).animate({scrollLeft: $('#' + this.tabId + this.active)[0].offsetLeft + ($('#' + this.tabId + this.active).width() / 2) - ($('#' + this.tabId).width() / 2)}, 500)
            }, 200)
        },
    },
}
</script>

<style scoped>
.tab { overflow: auto; white-space: nowrap; }
.active {
    border-bottom: 1px solid #000;
    color: #000!important;
}
button { text-decoration: none!important; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.mobile-container { min-width: min-content; }
</style>
