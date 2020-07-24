<template>
    <div id="waiting-internet-connection" class="modal fade dismiss-on-route-change" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    {{ heading }}
                </div>
                <div class="modal-body">
                    {{ message }}
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button  type="button" class="btn btn-sm btn-primary border-0" @click="$router.go()">Retry Now</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        heading() { return this.$store.state.auth.reloadModal.header },
        message() { return this.$store.state.auth.reloadModal.message },
    }
}
</script>

<style scoped>
</style>