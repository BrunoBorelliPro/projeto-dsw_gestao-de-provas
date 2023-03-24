<template>
  <div class=".container">
    <div class="form">
      <h1>Adicionar Questão</h1>
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
            <button
              class="delete_alternative"
              @click="() => removeAlternative(index)"
            >
              🗑️
            </button>
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
          <button @click="addAlternative">Adicionar</button>
        </div>
      </div>

      <div v-else :key="'essay'" class="form__add_alternative"></div>
      <button @click="createQuestion">Cadastrar</button>
    </div>
    <div class="question_list__body">
      <b-form-input
        v-model="findQuestion"
        placeholder="Procurar questão"
      ></b-form-input>

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
        :sub-title="question.content"
      >
        <b-card-text
          v-for="(alternative, index1) in question.alternatives"
          :key="index1"
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
export default {
  name: 'QuestoesPage',
  middleware: ['auth'],

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

      questions: [],

      findQuestion: '',
    }
  },
  mounted() {
    this.getQuestions()
  },

  methods: {
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
        fetch('http://localhost:8080/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.questionData),
        }).then(() => {
          this.questionData.content = ''
          this.questionData.alternatives = []
          this.questionData.question_type = ''
          this.getQuestions()
        })
      }
    },
    editQuestion(question) {
      this.$router.push({ path: `/professor/questoes/${question.id}` })
    },

    deleteQuestion(question) {
      fetch(`http://localhost:8080/questions/${question.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.getQuestions()
      })
    },
    getQuestions() {
      fetch('http://localhost:8080/questions', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.questions = data
        })
    },
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
