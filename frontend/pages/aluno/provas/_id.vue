<template>
  <div class="container">
    <div class="box">
      <div id="printMe" class="test">
        <div class="title">
          <h1>{{ test.title }}</h1>
        </div>
        <div class="questions">
          <div
            v-for="(question, index) in test.applied_questions"
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
import ToAnswerQuestionCard from '../../../components/questions/aluno/ToAnswerQuestionCard.vue'

export default {
  name: 'QuestoesPage',
  components: { ToAnswerQuestionCard },
  layout(context) {
    return 'aluno'
  },

  async asyncData({ $api, route }) {
    const test = await $api.appliedTests.getAppliedTestById(route.params.id)
    console.log(test.applied_questions)
    return { test }
  },
  mounted() {
    this.$store.dispatch('responseTest/resetResponseTest')
  },

  methods: {
    submitTest() {
      const res = confirm('Deseja mesmo enviar a prova para correção?')
      if (!res) return

      const test = {
        appliedTestId: this.$route.params.id,
      }

      const studenteResponses = this.$store.state.responseTest.questions.map(
        (q) => {
          return {
            questionId: q.id,
            response: q.response,
            question_type: q.question_type,
          }
        }
      )
      test.responses = studenteResponses
      this.$store
        .dispatch('responseTest/submitTest', test)
        .then(() => {
          this.$router.push({
            path: `/aluno/provas/resultado/${this.$route.params.id}`,
          })
        })
        .catch(() => {
          alert('Erro ao enviar a prova para correção')
        })
    },
    print() {
      this.$router.push({
        path: `/aluno/provas/imprimir/${this.$route.params.id}`,
      })
    },
  },
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
