<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/">Home</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/aluno/provas">Provas</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/aluno/provas/resultado">Provas Realizadas</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/auth/logout">Sair</NuxtLink>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'isStudent'],
  data() {
    return {}
  },
}
</script>

<style scoped></style>
