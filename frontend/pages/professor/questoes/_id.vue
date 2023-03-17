<template>
  <div class="form">
    <h1>Editar Questão</h1>
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
    <button @click="updateQuestion">Atualizar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionData: {
        content: '',
        alternatives: [],
        question_type: '',
      },
      questionTypeSelected: '',
      questionTypes: [
        { name: 'Múltipla Escolha', value: 'multiple_choice' },
        { name: 'Verdadeiro ou Falso', value: 'true_false' },
        { name: 'Dissertativa', value: 'essay' },
      ],
      alternativeForm: {
        content: '',
        is_correct: false,
      },
    }
  },
  fetch() {
    fetch(`http://localhost:8080/questions/${this.$route.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Erro ao buscar questão')
        }
      })
      .catch((error) => {
        this.$router.push({ path: `/professor/questoes`, error: error.message })
      })

      .then((data) => {
        if (!data) {
          this.$router.push({ path: `/professor/questoes` })
          return
        }
        this.questionData = data
        this.questionTypeSelected = data.question_type
      })
  },
  methods: {
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
    addAlternative() {
      this.questionData.alternatives.push(this.alternativeForm)
      this.alternativeForm = {
        content: '',
        is_correct: false,
      }
    },
    removeAlternative(index) {
      this.questionData.alternatives.splice(index, 1)
    },
    updateQuestion() {
      if (!this.validateQuestion()) {
        return
      }
      this.questionData.question_type = this.questionTypeSelected
      fetch(`http://localhost:8080/questions/${this.$route.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.questionData),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$router.push('/professor/questoes')
        })
    },
  },
}
</script>

<style>
.form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
}
.form__select {
  width: 300px;
  height: 50px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
}
.form__add_alternative {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
