<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <div class="ml-3 small text-muted py-2">{{appliedFilterSorterText}}</div>
            <div class="mr-1">
                <custom-button type="filter-sorter" @click="openFilter()"/>
            </div>
        </div>
        <filter-sorter-modal :modalId="filterModalId" :filters.sync="filters_" @filterChanged="filterChanged" @filtersReset="filtersReset"/>
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import FilterSorterModal from './FilterSorterModal'


export default {
    components: {
        'custom-button': CustomButton,
        'filter-sorter-modal': FilterSorterModal
    },
    props: {
        filters: [Object, Array],
        selectedFilters: [Object, Array]
    },
    data() {
        return {
            filterModalId: 'fs-' + this.randomString(15),
            appliedFilterSorterText: ''
        }
    },
    computed: {
        filters_: {
            get() {
                return this.filters
            },
        },
        sortText() {
            const sortFilter = this.selectedFilters.find(filter => filter.effect.includes('sort-'))
            return sortFilter && (sortFilter.selected || sortFilter.default)
        },
        filterText() {
            const filterTexts = this.selectedFilters.filter(filter => filter.effect.includes('filter-') && (this.isAllTrue([filter.selected, filter.selected != filter.default]) || filter.forceShow))
            return filterTexts.map(filter => `${filter.title}: ${this.parseArray(filter.selected || filter.default).join(', ')}`).join(' | ')
        },
        filterSorterText() {
            let arr = []
            if(this.sortText) arr.push(this.sortText)
            if(this.filterText) arr.push(this.filterText)
            return arr.join(' | ')
        }
    },
    watch: {
        '$route.query'(val) { this.saveFilterSorterText() }
    },
    created() {
        this.saveFilterSorterText()
    },
    methods: {
        openFilter() {
            $(`#${this.filterModalId}`).modal('show')
        },
        filterChanged(filter) { this.$emit('filterChanged', filter) },
        filtersReset(filter) { this.$emit('filtersReset', filter) },
        saveFilterSorterText() { this.appliedFilterSorterText = this.filterSorterText }
    }
}
</script>

<style scoped>
</style>
