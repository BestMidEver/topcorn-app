<template>
    <nav id="navigation-bar" class="navbar navbar-light bg-white fixed-bottom bottom-line-md top-line top-line-md-none nav-shadow py-0 py-md-1">
        <!-- Mobile Register button -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/register" class="nav-link">
                    <font-awesome-icon icon="plus"/>
                    <span> Register</span>
                </router-link>
            </li>
        </ul>

        <!-- Mobile Login button -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/login" class="nav-link">
                    <font-awesome-icon icon="sign-in-alt"/>
                    <span> Login</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
}
</script>

<style scoped>
@media (min-width: 768px) {
	.fixed-bottom { top: 0; bottom: auto; }
}
.active { color: var(--info)!important }
</style>
