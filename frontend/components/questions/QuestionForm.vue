<template>
  <div class="form">
    <h1>{{ title }}</h1>
    <select v-model="questionTypeSelected" class="form__select">
      <option
        v-for="(questionType, index) in questionTypes"
        :key="index"
        selected
        :value="questionType.value"
      >
        {{ questionType.name }}
      </option>
    </select>
    <textarea
      id="question"
      v-model="questionData.content"
      name="question"
      cols="30"
      rows="10"
      placeholder="Enunciado da questão"
    />
    <div
      v-if="
        questionTypeSelected === 'multiple_choice' ||
        questionTypeSelected === 'true_false'
      "
      :key="'multiple_choice'"
      class="form__add_alternative"
    >
      <h2>Alternativas</h2>
      <div
        v-for="(alternative, index) in questionData.alternatives"
        :key="index"
        class="alternatives__list"
      >
        <p>
          <b-button
            class="delete_alternative"
            @click="() => removeAlternative(index)"
          >
            🗑️
          </b-button>
          {{ index + 1 }}) {{ alternative.content }}
          {{ alternative.is_correct ? '✅' : '❌' }}
        </p>
      </div>
      <div class="form__add_alternative__input">
        <input
          v-model="alternativeForm.content"
          type="text"
          placeholder="Alternativa"
        />
        <input v-model="alternativeForm.is_correct" type="checkbox" />
        <b-button variant="primary" @click="addAlternative">Adicionar</b-button>
      </div>
    </div>

    <div v-else :key="'essay'" class="form__add_alternative"></div>
    <b-button variant="primary" @click="createQuestion">{{
      submitBtnText
    }}</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'QuestionForm',
  props: {
    editQuestionId: {
      type: String,
      default: '',
    },
    submitBtnText: {
      type: String,
      default: 'Cadastrar',
    },
    title: {
      type: String,
      default: 'Adicionar Questão',
    },
  },
  data() {
    return {
      questionTypes: [
        { name: 'Multipla escolha', value: 'multiple_choice' },
        { name: 'Verdadeiro/Falso', value: 'true_false' },
        { name: 'Dissertativa', value: 'essay' },
      ],
      questionTypeSelected: 'multiple_choice',
      questionData: {
        content: '',
        alternatives: [],
        question_type: '',
      },
      alternativeForm: {
        content: '',
        is_correct: false,
      },
    }
  },
  computed: {
    ...mapState({
      questions: (state) => state.questions.questions,
    }),
  },
  mounted() {
    if (this.editQuestionId) {
      this.$store
        .dispatch('questions/getQuestion', this.editQuestionId)
        .then(() => {
          const question = this.questions.find(
            (question) => question.id === this.editQuestionId
          )

          this.questionData.content = question.content
          this.questionData.question_type = question.question_type
          question.alternatives.forEach((alternative) => {
            this.questionData.alternatives.push({
              content: alternative.content,
              is_correct: alternative.is_correct,
            })
          })

          this.questionTypeSelected = this.questionData.question_type
        })
    }
  },

  methods: {
    removeAlternative(index) {
      this.questionData.alternatives.splice(index, 1)
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
    validateQuestion() {
      if (this.questionData.content === '') {
        alert('Preencha o campo de questão')
        return false
      }
      if (this.questionTypeSelected === 'essay') {
        this.questionData.alternatives = []
      }
      if (
        this.questionTypeSelected === 'multiple_choice' ||
        this.questionTypeSelected === 'true_false'
      ) {
        if (this.questionData.alternatives.length < 2) {
          alert('Adicione pelo menos duas alternativas')
          return false
        }
        if (
          this.questionData.alternatives.filter(
            (alternative) => alternative.is_correct
          ).length === 0
        ) {
          alert('Selecione pelo menos uma alternativa correta')
          return false
        }
      }
      return true
    },
    createQuestion() {
      this.questionData.question_type = this.questionTypeSelected

      if (this.validateQuestion()) {
        if (this.editQuestionId) {
          this.$store.dispatch('questions/updateQuestion', {
            id: this.editQuestionId,
            question: this.questionData,
          })
          this.$router.push({ path: `/professor/questoes` })
        } else {
          this.$store.dispatch('questions/createQuestion', this.questionData)
          this.questionData = {
            content: '',
            alternatives: [],
            question_type: '',
          }
          this.alternativeForm = {
            content: '',
            is_correct: false,
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.form__select {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}
.form__add_alternative {
  width: 100%;
  margin-bottom: 20px;
}
.form__add_alternative__input {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.form__add_alternative__input input {
  width: 100%;
  height: 100%;
  margin-right: 10px;
}
.alternatives__list {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.alternatives__list p {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid #000;
}
.delete_alternative {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
