<template>
  <div id="app">
    <navigation v-if="loggedIn"/>
    <navigation-logout v-else/>
    <router-view class="body"/>
    <vote-comment/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import NavigationLogout from '@/components/NavigationLogout.vue'
import mixin from './plugins/helpers.js'
import VoteComment from '@/components/modals/VoteComment.vue'


export default {
    components: {
      'navigation': Navigation,
      'navigation-logout': NavigationLogout,
      'vote-comment': VoteComment,
    },
    computed: {
      loggedIn() { return this.$store.getters['auth/loggedIn'] }
    }
}
</script>

<style>
:root {
  --navigation-bar-height: 54px;
  --navigation-bar-height-md: 50px;
  
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
  --lastseen-color: #007bff;
  --muted-line-color: #e9ecef;
  --follow-color: #28a745;
}

.body { height: calc(100vh - var(--navigation-bar-height)); overflow: auto; }

.one-line{ overflow: auto; white-space: nowrap; }
.bottom-line{ border-bottom: 1px solid var(--muted-line-color); }
.top-line{ border-top: 1px solid var(--muted-line-color); }

@media (min-width: 768px) {
  .body {  height: calc(100vh - var(--navigation-bar-height-md)); margin-top: var(--navigation-bar-height-md); }
  .bottom-line-md{ border-bottom: 1px solid var(--muted-line-color); }
  .top-line-md{ border-top: 1px solid var(--muted-line-color); }
}
</style>