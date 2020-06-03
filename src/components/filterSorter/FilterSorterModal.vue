<template>
    <div :id="modalId" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header d-flex align-items-center">
                    <h6 class="mb-0">Filter & Sorter</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <filter-sorter-picker v-for="(filter, i) in filters" :key="i" :data="filter" :selected.sync="query[filter.title]"/>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-sm text-secondary border-0" data-dismiss="modal" :disabled="disabled" @click="resetFilters()">Reset</button>
                    <button type="button" class="btn btn-sm btn-primary border-0" data-dismiss="modal" :disabled="disabled" @click="applyFilters()">Apply</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FilterSorterPicker from './FilterSorterPicker.vue'
import urlGenerate from '@/mixins/urlGenerate'


export default {
    components: {
        'filter-sorter-picker': FilterSorterPicker
    },
    mixins: [urlGenerate],
    props: {
        modalId: String,
        disabled: Boolean,
        filters: Array
    },
    data() {
        return {
            query: JSON.parse(JSON.stringify(this.$route.query))
        }
    },
    methods: {
        applyFilters() { this.changeQuery(this.query) },
        resetFilters() { this.query = {}; this.applyFilters() }
    }
}
</script>

<style scoped>
</style>
