<template>
  <div class="container">
    <div class="box">
      <div class="title"><h1>Provas disponíveis</h1></div>
      <div class="tests">
        <div
          v-for="(test, index) in appliedTests"
          :key="index"
          class="test"
          v-on:click="goToTest(test.id)"
        >
          <ToAnswerTestCard :test="test" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ToAnswerTestCard from '../../../components/questions/aluno/ToAnswerTestCard.vue'

export default {
  methods: {
    goToTest(testId) {
      this.$router.push({ path: `/aluno/provas/${testId}` })
    },
  },

  computed: {
    ...mapState({
      appliedTests: (state) => state.appliedTests.appliedTests,
    }),
  },
  mounted() {
    const user = this.$cookies.get('user')
    console.log(user)
    this.$store.dispatch(
      'appliedTests/getAppliedTests',
      this.$cookies.get('user').userId
    )
  },

  data() {
    return {
      tests: [],
    }
  },
  layout(context) {
    return 'aluno'
  },
  name: 'QuestoesPage',
  middleware: ['auth'],
  components: { ToAnswerTestCard },
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
  width: 100%;
  max-width: 800px;
}

.title {
  margin-bottom: 2rem;
}
.tests {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
}
</style>
