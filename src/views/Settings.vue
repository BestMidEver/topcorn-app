<template>
    <div>
        <header-bar title="Settings" :goBack="true"/>
        <static-modal-container type="expanded">
            <template slot="content">
                <div class="modal-header py-0 px-1">
                    <settings-navbar/>
                </div>
                <router-view></router-view>
            </template>
        </static-modal-container>
    </div>
</template>

<script>
import SettingsNavbar from '@/components/settings/SettingsNavbar.vue'
import StaticModalContainer from '@/components/modals/StaticModalContainer.vue'
import HeaderBar from '@/components/HeaderBar.vue'


export default {
    components: {
        'settings-navbar': SettingsNavbar,
        'static-modal-container': StaticModalContainer,
        'header-bar': HeaderBar,
    },
}
</script>

<style scoped>
</style>
