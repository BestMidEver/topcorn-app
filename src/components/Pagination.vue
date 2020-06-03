<template>
    <div class="d-flex justify-content-center mx-1" :class="expandStatus !== 'compressed' ? 'mt-3' : ''">
        <nav v-show="expandStatus !== 'compressed' && totalPages > 1" id="pagination-nav">
            <ul class="pagination">
                <li v-if="totalPages > 10" class="page-item first-page" :class="firstPageClass">
                    <button class="page-link rounded-0 border-white" @click="paginate(1)"><font-awesome-icon :icon="['fas', 'fast-backward']"/></button>
                </li>
                <span class="d-flex" style="margin-right: 1px">
                    <li v-for="i in totalPages" :key="i" class="page-item" :class="{ active: i === currentPage }"><button :id="'paginate-button' + i" class="page-link" @click="paginate(i)">{{ i }}</button></li>
                </span>
                <li v-if="totalPages > 10" class="page-item last-page" :class="lastPageClass">
                    <button class="page-link rounded-0 border-white" @click="paginate(totalPages)"><font-awesome-icon :icon="['fas', 'fast-forward']"/></button>
                </li>
            </ul>
        </nav>
        <no-result v-if="showNoResult" :expandStatus="expandStatus"/>
    </div>
</template>

<script>
import NoResult from '@/components/NoResult.vue'


export default {
    components: {
        'no-result': NoResult,
    },
    props: {
        tmdbData: Object,
        tcData: Object,
        tcAllResults: Array,
        itemPerPage: Number,
        expandStatus: {
            validator: value => ['expanded', 'compressed'].includes(value)
        },
    },
    computed: {
        totalPages() {
            if(this.tmdbData) return this.tmdbData.total_pages
            if(this.tcData) return this.tcData.last_page
            if(this.tcAllResults) return Math.ceil(this.tcAllResults.length / this.itemPerPage)
        },
        currentPage() { return parseInt(this.$route.params.page) },
        firstPageClass() { return (this.currentPage === 1 ? 'disabled ' : '') },
        lastPageClass() { return (this.currentPage === this.totalPages ? 'disabled ' : '') },
        loading() { return this.$store.state.loading.pageLoading },
        showNoResult() {
            if(this.tmdbData) return !(this.tmdbData.results.length > 0)
            if(this.tcData) return !(this.tcData.data.length > 0)
            if(this.tcAllResults) return !(this.tcAllResults.length > 0)
        },
    },
    watch: {
        loading(val) { if(!val && this.expandStatus !== 'compressed') this.centerTab() }
    },
    methods: {
        paginate(to) {
            $(".body").animate({ scrollTop: 0 }, 'fast')
            if(this.$route.params.page != to) {
                let params = this.$route.params
                params.page = to
                this.$router.replace({ name: this.$route.name, params: params, query: this.$route.query })
            }
            this.centerTab()
        },
        centerTab() { if(this.totalPages > 1) $('#pagination-nav').animate({scrollLeft: $('#paginate-button' + this.currentPage)[0].offsetLeft + ($('#paginate-button' + this.currentPage).width() / 2) - ($('#pagination-nav').parent().width() / 2)}, 500) }
    },
}
</script>

<style scoped>
nav{ overflow: auto; white-space: nowrap;  max-width: 500px; }
.pagination{ min-width: min-content;}
.first-page{
    left: 0;
    position: sticky;
    z-index: 1040;
}
.last-page{
    right: 0;
    position: sticky;
    z-index: 1040;
}
svg{ font-size: 10px; }
</style>
