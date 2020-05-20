<template>
    <div class="card-block">
        <h6 class="card-title px-1 py-1 my-0 text-dark" :class="'text-' + align || 'left'" style="font-size: 0.9rem;">
            {{ heading }}
            <small v-if="year" class="text-muted d-block pt-1">
                <em>({{ year }})</em>
            </small>
            <small v-if="listData" class="text-muted d-block pt-1">
                <em>{{ listData.join(' • ') }}</em>
            </small>
        </h6>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        listData: Array,
        align: {
            validator: value => ['center', 'left', 'right'].includes(value)
        },
    },
    computed: {
        heading() {
            if(this.data.title) return this.data.title
            if(this.data.name) return this.data.name
        },
        year() {
            if(this.data.release_date) return this.dateToYear(this.data.release_date)
            if(this.data.first_air_date) return this.dateToYear(this.data.first_air_date)
        },
    }
}
</script>

<style scoped>

</style>
