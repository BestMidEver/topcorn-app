<template>
    <div class="modal fade" id="vote-comment-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">{{ heading }}<em class="small text-muted" v-if="year"> ({{ year }})</em></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>Legendary</div>
                            <div>
                                <button v-for="star in 5" class="btn btn-sm p-0"><font-awesome-icon :icon="['far', 'star']" style="font-size: 30px"/></button>
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <textarea rows="3" class="form-control" id="input_review" placeholder="Say something..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Clear</button>
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        data() { return this.$store.state.modals.voteComment },
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