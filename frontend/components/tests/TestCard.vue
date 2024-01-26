<template>
  <div class="test-card" @click="selectTest">
    <div class="test-title">
      <h1>{{ test.title }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestCard',

  props: {
    test: {
      type: Object,
      required: true,
    },
    isToPdf: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    selectTest() {
      if (!this.isToPdf) {
        return this.$router.push(`/professor/aplicar/provas/${this.test.id}`)
      }
      return this.$router.push(`/professor/aplicar/imprimir/${this.test.id}`)
    },
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

.test-card:hover {
  cursor: pointer;
  background-color: #ccc;

  transition: background-color 0.2s;
}

.test-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
