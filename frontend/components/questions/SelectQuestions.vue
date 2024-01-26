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
        @click="select(question)"
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
      return this.questions.filter(
        (question) =>
          question.content
            .toLowerCase()
            .includes(this.findQuestion.toLowerCase()) &&
          !this.$store.state.selectedQuestions.selectedQuestions.includes(
            question
          )
      )
    },

    select(question) {
      this.$store.dispatch('selectedQuestions/selectQuestion', question)
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.question_list__question {
  cursor: pointer;
}
.question_list__question:hover {
  cursor: pointer;
  background-color: #b9b9b9;
}

.overflow {
  overflow-y: auto;
  max-height: 100px;
}
</style>
