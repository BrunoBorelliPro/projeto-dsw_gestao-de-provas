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
          <NuxtLink to="/professor/aplicar/provas">Aplicar Provas</NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/professor/provas/provas_aplicadas"
            >Provas Aplicadas</NuxtLink
          >
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/professor/aplicar/imprimir">Imprimir Provas</NuxtLink>
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
  name: '',

  middleware: ['isTeacher'],

  data() {
    return {}
  },
}
</script>
