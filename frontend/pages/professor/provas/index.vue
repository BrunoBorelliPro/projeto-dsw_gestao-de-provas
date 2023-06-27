<template>
  <div class="container">
    <div class="box">
      <div class="test">
        <h1>Provas</h1>
        <b-form>
          <b-form-group id="title-group" label="Título">
            <b-form-input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="Título da prova"
            ></b-form-input>
          </b-form-group>
        </b-form>

        <SelectedQuestions />

        <b-button variant="primary" @click="createTest">Criar Prova</b-button>
      </div>
      <SelectQuestions />
      <div>
        <h1>Provas salvas</h1>
        <div>
          <b-card
            v-for="(test, index) in tests"
            :key="index"
            :title="test.title"
            class="test__card"
            @click="editTest(test)"
          >
            <b-card-text>
              Número de questões: {{ test.questions.length }}
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SelectQuestions from '../../../components/questions/SelectQuestions.vue'
import SelectedQuestions from '../../../components/questions/SelectedQuestions.vue'

export default {
  name: 'TestsPage',
  components: { SelectedQuestions, SelectQuestions },
  layout(context) {
    return 'professor'
  },
  middleware: ['auth'],
  data() {
    return {
      form: {
        title: '',
        teacherId: this.$cookies.get('user').userId,
      },
    }
  },
  computed: {
    ...mapState({
      tests: (state) => state.test.tests,
    }),
  },
  mounted() {
    this.$store.dispatch('test/getTests')
  },
  methods: {
    createTest() {
      const questionsIds =
        this.$store.state.selectedQuestions.selectedQuestions.map(
          (question) => question.id
        )
      const payload = {
        ...this.form,
        questions: questionsIds,
      }

      if (!payload.title) return alert('Insira um título para a prova')
      if (!payload.questions.length)
        return alert('Selecione pelo menos uma questão')

      this.$store.dispatch('test/createTest', payload)
    },
    editTest(test) {
      this.$router.push({ path: `/professor/provas/${test.id}` })
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.test__card:hover {
  cursor: pointer;
  background-color: #b9b9b9;
}
</style>
