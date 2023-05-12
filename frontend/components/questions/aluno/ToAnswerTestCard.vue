<template>
  <div class="test-card">
    <div class="test-title">
      <h1>{{ test.test.title }}</h1>
    </div>
    <div class="date">
      <p>
        Disponível até:
        {{ new Date(test.available_until).toLocaleString('pt-BR') }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ToAnswerTestCard',

  props: {
    test: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {}
  },
}
</script>

<style scoped>
.test-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 2rem;
}
</style>
