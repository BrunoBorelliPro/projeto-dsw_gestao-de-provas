<template>
  <div class="test-card" v-on:click="selectTest">
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
  },
  methods: {
    selectTest() {
      this.$router.push(`/professor/aplicar/${this.test.id}`)
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
