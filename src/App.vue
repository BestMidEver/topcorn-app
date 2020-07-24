<template>
  <div id="app">
    <navigation v-if="loggedIn"/>
    <navigation-logout v-else/>
    <router-view id="the-body" class="body pb-md-3" :class="loggedIn ? '' : 'body-with-tiny-navbar'"/>
    <vote-comment/>
    <reload-overlayer/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import NavigationLogout from '@/components/NavigationLogout.vue'
import mixin from './plugins/helpers.js'
import VoteComment from '@/components/modals/voteModal/VoteComment.vue'
import ReloadOverlayer from '@/components/modals/ReloadOverlayer.vue'


export default {
    components: {
      'navigation': Navigation,
      'navigation-logout': NavigationLogout,
      'vote-comment': VoteComment,
      'reload-overlayer': ReloadOverlayer,
    },
    computed: {
      loggedIn() { return this.$store.getters['auth/loggedIn'] }
    }
}
</script>

<style>
:root {
  --navigation-bar-height: 54px;
  --navigation-bar-height-md: 48px;
  --tiny-navigation-bar-height: 41px;
  
  --tab-active-color: #5BC0EB;
  --very-dark-color: #232323;
  --success-darken-color: #28a745aa;
  --success-hover-color: #218838;
  --info-darken-color: #17a2b8aa;
  --info-hover-color: #138496;
  --secondary-darken-color: #6c757daa;
  --secondary-hover-color: #5a6268;
  --warning-darken-color: #ffc107aa;
  --warning-hover-color: #e0a800;
  --danger-darken-color: #dc3545aa;
  --danger-hover-color: #c82333;
  --text-link-color: #212529;
  --text-link-hover-color: #121416;
  --hover-bg-color: #ececec;
  --hover-color: #000;
  --background-color: #fff;
  --like-color: #ed4956;
  --muted-line-color: #e9ecef;
  --card-border-color: #dfdfdf;
  --footer-gray: #f7f7f7;
}
/* calc(100vh - var(--navigation-bar-height)) */
.body { height: 100vh; padding-bottom: calc(1rem + var(--navigation-bar-height)); overflow: auto; }/* calc(100vh - var(--tiny-navigation-bar-height)) */
.body-with-tiny-navbar { height: 100vh; padding-bottom: calc(1rem + var(--tiny-navigation-bar-height)); }

.one-line { overflow: auto; white-space: nowrap; }
.one-line-dots { display: -webkit-box!important; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
.bottom-line { border-bottom: 1px solid var(--muted-line-color); }
.top-line { border-top: 1px solid var(--muted-line-color); }
.card-border { border: 1px solid var(--card-border-color) }

@media (min-width: 768px) {
  .body { padding-top: var(--navigation-bar-height-md) }/* height: calc(100vh - var(--navigation-bar-height-md)); margin-top: var(--navigation-bar-height-md); */
  .bottom-line-md { border-bottom: 1px solid var(--muted-line-color); }
  .top-line-md { border-top: 1px solid var(--muted-line-color); }
  .top-line-md-none { border-top: none; }
}
.collapsing { transition: none !important }
</style>