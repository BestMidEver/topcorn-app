<template>
    <div>
        <!-- <progress-bar/>
        <choose-modal :between="between" :view="view"/> -->
        <vote-modal/>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import ChooseModal from '@/components/ChooseModal.vue'
import VoteModal from '@/components/VoteModal.vue'


export default {
    components: {
        'progress-bar': ProgressBar,
        'choose-modal': ChooseModal,
        'vote-modal': VoteModal,
    },
    data: function() {
        return {
            between: ['Movies', 'Series'],
            view: 'Movies'
        }
    }
}
</script>

<style scoped>
</style>