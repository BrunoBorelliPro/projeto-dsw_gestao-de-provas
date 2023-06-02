<template>
  <div class="container">
    <div class="box">
      <div class="test" id="printMe">
        <div class="title">
          <h1>{{ test.title }}</h1>
        </div>
        <div class="questions">
          <div
            v-for="(question, index) in test.questions"
            :key="index"
            class="question"
          >
            <ToAnswerQuestionCard :question="question" :number="index + 1" />
          </div>
        </div>
      </div>

      <div>
        <div class="buttons">
          <b-button variant="primary" @click="submitTest"
            >Enviar Prova</b-button
          >
          <b-button variant="primary" @click="print">Imprimir Prova</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ToAnswerQuestionCard from '../../../components/questions/aluno/ToAnswerQuestionCard.vue'

export default {
  data() {
    return {
      test: {},
    }
  },
  methods: {
    submitTest() {
      alert('submit test')
    },
    print() {
      console.log('print')
      console.log(this.test)
      this.$router.push({
        path: `/aluno/provas/imprimir/${this.$route.params.id}`,
      })
    },
  },
  computed: {
    ...mapState({
      appliedTests: (state) => state.appliedTests.appliedTests,
    }),
  },
  mounted() {
    this.$store
      .dispatch('appliedTests/getAppliedTestById', this.$route.params.id)
      .then(() => {
        const test = this.appliedTests.find(
          (test) => test.id === this.$route.params.id
        )
        console.log(test)
        this.test = test.test
      })
  },
  layout(context) {
    return 'aluno'
  },
  name: 'QuestoesPage',
  middleware: ['auth'],
  components: { ToAnswerQuestionCard },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.questions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.buttons {
  width: 100%;
}
</style>
