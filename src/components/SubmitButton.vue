<template>
    <div class="d-flex justify-content-center">
        <div class="mt-3 col-12 px-1">
            <button type="submit" class="btn btn-primary btn-sm text-white btn-block">{{ name }}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
    },
}
</script>

<style scoped>

</style>
