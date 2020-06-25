<template>
    <button type="button" class="btn" :class="computedClass" @click="$emit('click')">
        <font-awesome-icon v-if="type !== 'text'" :icon="status ? icon.active : icon.default" :style="iconSize && { fontSize: iconSize }"/>
        <small><slot></slot></small>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            validator: value => ['text', 'watch-later', 'seen', 'ban', 'share', 'edit', 'expand', 'edit', 'create', 'like', 'show-less', 'scroll-up', 'bookmark', 'bell', 'last-seen', 'filter', 'sort', 'follow', 'back', 'filter-sorter'].includes(value)
        },
        borderRadius: {
            validator: value => ['left', 'right', 'bottom-left', 'bottom-right', 'none'].includes(value)
        },
        status: {
            validator: value => ['', 'active', 'active0', 'active1', 'active2', 'active3', 'active4', 'active5'].includes(value)
        },
        iconSize: String
    },
    data() {
        return {
            icons: {
                'watch-later': { default: ['far', 'clock'], active: ['fas', 'clock'] },
                'seen': { default: ['far', 'star'], active: 'check' },
                'ban': { default: 'ban', active: 'ban' },
                'share': { default: 'share', active: 'share' },
                'expand': { default: ['fas', 'expand-alt'], active: ['fas', 'expand-alt'] },
                'edit': { default: ['far', 'edit'], active: ['fas', 'edit'] },
                'create': { default: ['far', 'plus-square'], active: ['fas', 'plus-square'] },
                'like': { default: ['far', 'heart'], active: ['fas', 'heart'] },
                'show-less': { default: ['fas', 'angle-up'], active: ['fas', 'angle-up'] },
                'scroll-up': { default: ['fas', 'arrow-up'], active: ['fas', 'arrow-up'] },
                'bookmark': { default: ['far', 'bookmark'], active: ['fas', 'bookmark'] },
                'bell': { default: ['far', 'bell'], active: ['fas', 'bell'] },
                'last-seen': { default: ['fas', 'thumbtack'], active: ['fas', 'thumbtack'] },
                'filter': { default: ['fas', 'filter'], active: ['fas', 'filter'] },
                'sort': { default: ['fas', 'sort-amount-down'], active: ['fas', 'sort-amount-down'] },
                'follow': { default: ['fas', 'user-friends'], active: ['fas', 'user-friends'] },
                'back': { default: ['fas', 'arrow-left'], active: ['fas', 'arrow-left'] },
                'filter-sorter': { default: ['fas', 'sliders-h'], active: ['fas', 'sliders-h'] },
            },
        }
    },
    computed: {
        icon: function () { return this.icons[this.type] },
        computedClass: function () { return this.type + (this.borderRadius ? ' ' + this.borderRadius : '') + ' ' + this.status },
    }
}
</script>

<style scoped>
button{ color: var(--secondary)!important; }


.watch-later.active{ color: var(--warning)!important; }
.seen.active5{ background: var(--success); color: #fff!important; }
.seen.active5:hover{ color: var(--success)!important; }
.seen.active4{ background: var(--info); color: #fff!important; }
.seen.active4:hover{ color: var(--info)!important; }
.seen.active3{ background: var(--secondary); color: #fff!important; }
.seen.active3:hover{ color: var(--secondary)!important; }
.seen.active2{ background: var(--warning); color: #fff!important; }
.seen.active2:hover{ color: var(--warning)!important; }
.seen.active1{ background: var(--danger); color: #fff!important; }
.seen.active1:hover{ color: var(--danger)!important; }
.ban.active, .bell.active{ color: var(--danger)!important; }
.share.active{ color: var(--blue)!important; }
.expand.active, .edit.active{ color: var(--tab-active-color)!important; }
.like.active{ color: var(--like-color)!important; }
.scroll-up, .scroll-down{ background: var(--background-color)!important; }
.last-seen.active{ color: var(--lastseen-color)!important }
.follow.active{ color: var(--follow-color)!important }
.bookmark.active{ color: var(--info)!important; }

.left{ border-top-right-radius: 0!important; border-bottom-right-radius: 0!important; }
.right{ border-top-left-radius: 0!important; border-bottom-left-radius: 0!important; }
.bottom-left{ border-top-left-radius: 0!important; border-top-right-radius: 0!important; border-bottom-right-radius: 0!important; }
.bottom-right{ border-top-right-radius: 0!important; border-top-left-radius: 0!important; border-bottom-left-radius: 0!important; }
.none{ border-radius: 0!important; }
</style>
