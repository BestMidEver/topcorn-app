<template>
    <div class="card-footer p-0">
        <div class="row no-gutters">
            <template v-if="type === 'list'">
                <div class="col">
                    <custom-button type="watch-later" borderRadius="bottom-left" status="active" class="btn-sm btn-block border-0"></custom-button>
                </div>
                <div class="col-7">
                    <custom-button type="bookmark" borderRadius="none" status="active" class="btn-sm btn-block border-0"> Favorite</custom-button>
                </div>
            </template>
            <template v-else>
                <div class="col">
                    <custom-button type="watch-later" borderRadius="bottom-left" :status="watchLaterStatus" class="btn-sm btn-block border-0"></custom-button>
                </div>
                <div class="col-7">
                    <custom-button type="seen" borderRadius="none" :status="seenStatus" class="btn-sm btn-block border-0" data-toggle="modal" data-target="#vote-comment-modal" @click="$store.dispatch('modals/openVoteComment', data)"> Seen</custom-button>
                </div>
            </template>
            <div class="col">
                <custom-button type="ban" borderRadius="bottom-right" :status="banStatus" class="btn-sm btn-block border-0"></custom-button>
            </div>
        </div>
        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ng-cloak>
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalLabel">Memento <em class="small">(2000)</em></h6>
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
                                <textarea rows="3" class="form-control" id="input_review" placeholder="Say something ..."></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">delete</button>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">close</button>
                        <button type="button" class="btn btn-outline-primary" data-dismiss="modal">save</button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'custom-button': CustomButton,
    },
    props: {
        type: {
            validator: value => ['list'].includes(value)
        },
        data: Object,
    },
    computed: {
        watchLaterStatus() { return this.data.later_id > 0 ? 'active' : '' },
        seenStatus() { return this.data.rate_code > 0 ? `active${this.data.rate_code}` : '' },
        banStatus() { return this.data.ban_id > 0 ? 'active' : '' }
    },
    methods: {
        openSeenModal() {
            
        }
    }
}
</script>

<style scoped>
</style>