<template>
	<div class="dropdown d-inline mr-1">
        <custom-button data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :type="iconType" :borderRadius="borderRadius" iconSize="" status="" class="btn-sm btn-outline-secondary dropdown-toggle">
            <span> {{ activeItem }}</span>
        </custom-button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            <template v-for="(item, index) in items">
                <div v-if="item === '_'" :key="index" class="dropdown-divider"></div>
                <button v-else :key="index" class="dropdown-item" @click="activeItem = item">{{ item }}</button>
            </template>
        </div>
	</div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'


export default {
    components: {
        'custom-button': CustomButton,
    },
    props: {
        iconType: String,
        borderRadius: String,
        items: Array,
        active: String
    },
    computed: {
        activeItem: {
            get() {
                return this.active;
            },
            set(val) {
                this.$emit('update:active', val)
            }
        },
    }
}
</script>

<style scoped>
</style>
