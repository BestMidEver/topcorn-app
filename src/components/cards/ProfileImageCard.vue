<template>
    <div class="card">
        <img class="card-img-top" src="https://image.tmdb.org/t/p/w1280/2wuE20Gp7SazTc5a14jam55HFni.jpg">
        <div v-if="link && link.name" class="card-block">
            <a ng-href="/movie/299534" href="/movie/299534">
                <h6 class="card-title px-1 py-1 my-0 text-dark text-left">{{ link.name }}<small v-if="link.year" class="text-muted d-block pt-1"><em> ({{ link.year }})</em></small></h6>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        src: String,
        link: Object
    }
}
</script>

<style scoped>
</style>
