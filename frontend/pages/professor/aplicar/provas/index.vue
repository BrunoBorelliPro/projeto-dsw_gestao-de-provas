<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>Provas</h1>
      </div>
      <div class="test-list">
        <TestCard
          v-for="test in tests"
          :key="test.id"
          :test="test"
          :is-to-pdf="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TestCard from '../../../../components/tests/TestCard.vue'
export default {
  name: 'ApplyTestsPage',
  components: { TestCard },
  layout(context) {
    return 'professor'
  },
  middleware: ['auth'],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tests: (state) => state.test.tests,
    }),
  },
  mounted() {
    this.$store.dispatch('test/getTests')
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.test-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
