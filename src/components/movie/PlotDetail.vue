<template>
    <div>
        <div class="h6 pt-1"><span>{{ calculatedTitle }}</span></div>
        <div><slot></slot></div>
    </div>
</template>

<script>
export default {
    props: {
        title: [String, Array],
        count: Number
    },
    data: function() {
        return {
        }
    },
    computed: {
        calculatedTitle: function() { 
            if(Array.isArray(this.title)) {
                if(this.title.length > 1 && this.count > 1) return this.title[1]
                return this.title[0]
            }
            return this.title
        }
    }
}
</script>

<style scoped>
</style>
