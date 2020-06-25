<template>
    <div id="share-object-modal" class="modal fade dismiss-on-route-change" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <div class="modal-title h6">Share - {{ heading }}</div>
                        <small class="text-muted">Select user(s) among your followers.</small>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body scrollable-modal-body">
                    <share-object-users :data.sync="shareObjectUsers"/>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-sm text-secondary border-0" data-dismiss="modal" :disabled="$store.state.loading.responseWaiting">Cancel</button>
                    <button type="button" class="btn btn-sm btn-primary border-0" @click="share()" :disabled="$store.state.loading.responseWaiting || shareDisabled">Share</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import urlGenerate from '@/mixins/urlGenerate'
import shareObjectUsers from './ShareObjectUsers.vue'


export default {
    components: {
        'share-object-users': shareObjectUsers
    },
    mixins: [urlGenerate],
    data() {
        return {
        }
    },
    computed: {
        shareObject() { return this.$store.state.modals.shareObject.data || {} },
        type() { return this.$store.state.modals.shareObject.type || {} },
        shareObjectUsers() { return this.$store.state.modals.shareObjectUsersData || [] },
        shareObjectWatcher() { return `${this.type}-${this.shareObject}` },
        heading() {
            if(this.shareObject.title) return this.shareObject.title
            if(this.shareObject.name) return this.shareObject.name
        },
        userIds() { return this.shareObjectUsers.filter(obj => obj.selected === true).map(obj => obj.user_id) },
        shareDisabled() { return this.userIds.length === 0 } 
    },
    watch: {
        shareObjectWatcher() { this.$store.dispatch('modals/getShareObjectModalUsers') }
    },
    methods: {
        share() {
            this.$store.dispatch('modals/shareObjects', this.userIds)
        }
    }
}
</script>

<style scoped>
.scrollable-modal-body {
    overflow: scroll;
    max-height: 400px;
    overflow-x: hidden;
}
</style>