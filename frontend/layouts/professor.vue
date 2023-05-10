<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/">Home</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/professor/questoes">Questões</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/professor/provas">Provas</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/professor/aplicar">Aplicar Provas</NuxtLink>
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
