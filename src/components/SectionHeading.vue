<template>
    <div class="ml-3 mr-1 mx-md-1 d-flex align-items-center" style="min-height: 29px">
		<div class="mb-0" :class="titleSize || 'h6'">{{ title }} <template v-if="smallTitle">{{ smallTitleSeperator }}<small class="text-muted">{{ smallTitle }}</small></template></div>
        <div class="ml-auto">
            <div class="d-flex">
                <slot></slot>
            </div>
        </div>
	</div>
</template>

<script>


export default {
    props: {
        title: String,
        smallTitle: String,
        smallTitleSeperator: String,
        titleSize: {
            validator: value => ['h6', 'h5', 'h4'].includes(value)
        },
    }
}
</script>

<style scoped>
h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1{margin-bottom: 0;}
</style>
