<template>
  <div class="question_list__body">
    <b-form-input
      v-model="findQuestion"
      placeholder="Procurar questão"
      class="question_list__search_bar"
    ></b-form-input>
    <div class="question_list__questions">
      <b-card
        v-for="(question, index) in filterQuestions()"
        :key="index"
        :title="
          question.question_type === 'multiple_choice'
            ? 'Multipla escolha'
            : question.question_type === 'true_false'
            ? 'Verdadeiro/Falso'
            : 'Dissertativa'
        "
        class="question_list__question"
      >
        <b-card-text class="overflow">
          {{ question.content }}
        </b-card-text>
        <b-card-text
          v-for="(alternative, index1) in question.alternatives"
          :key="index1"
          class="question_list__question__alternative"
        >
          {{ index1 + 1 }} - {{ alternative.content }}
        </b-card-text>

        <b-button variant="warning" @click="editQuestion(question)"
          >Editar</b-button
        >
        <b-button variant="danger" @click="deleteQuestion(question)"
          >Deletar</b-button
        >
      </b-card>
      <b-card v-if="filterQuestions().length === 0">
        <b-card-text>Nenhuma questão encontrada</b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ListQuestions',
  data() {
    return {
      findQuestion: '',
    }
  },
  computed: {
    ...mapState({
      questions: (state) => state.questions.questions,
    }),
  },
  mounted() {
    this.$store.dispatch('questions/getQuestions')
  },
  methods: {
    // ...mapActions(['questions/createQuestion', 'questions/getQuestions']),
    filterQuestions() {
      return this.questions.filter((question) =>
        question.content.toLowerCase().includes(this.findQuestion.toLowerCase())
      )
    },
    addAlternative() {
      if (this.alternativeForm.content === '') {
        alert('Preencha o campo de alternativa')
        return
      }
      this.questionData.alternatives.push({
        content: this.alternativeForm.content,
        is_correct: this.alternativeForm.is_correct,
      })
      this.alternativeForm.content = ''
      this.alternativeForm.is_correct = false
    },
    removeAlternative(index) {
      this.questionData.alternatives.splice(index, 1)
    },

    editQuestion(question) {
      this.$router.push({ path: `/professor/questoes/${question.id}` })
    },
    deleteQuestion(question) {
      this.$store.dispatch('questions/deleteQuestion', question.id)
    },
  },
}
</script>

<style scoped>
.question_list__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.question_list__search_bar {
  width: 50%;
  margin-bottom: 20px;
}

.question_list__questions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.overflow {
  overflow-y: auto;
  max-height: 100px;
}
</style>
