<template>
  <div class="container">
    <div class="box">
      <div class="error">
        <div class="title">
          <h1>{{ $route.query.errorName }}</h1>
        </div>
        <div class="message">
          <p>{{ $route.query.errorMessage }}</p>
        </div>
        <b-button block variant="danger" @click="home"> Voltar </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout(context) {
    return 'guest'
  },
  methods: {
    home() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
}

.box {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  text-align: center;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}

.message {
  text-align: center;
}
</style>
