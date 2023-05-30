<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/">Home</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/auth/login">Login</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/auth/register">Register</NuxtLink>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },
}
</script>
