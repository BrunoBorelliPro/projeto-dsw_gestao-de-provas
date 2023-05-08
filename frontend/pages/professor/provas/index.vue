<template>
  <div class=".container">
    <div class="test">
      <h1>Provas</h1>
      <b-form>
        <b-form-group id="title-group" label="Título">
          <b-form-input
            id="title"
            type="text"
            v-model="form.title"
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
          v-on:click="editTest(test)"
        >
          <b-card-text>
            Número de questões: {{ test.questions.length }}
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SelectQuestions from '../../../components/questions/SelectQuestions.vue'
import SelectedQuestions from '../../../components/questions/SelectedQuestions.vue'

export default {
  name: 'QuestoesPage',
  data() {
    return {
      form: {
        title: '',
        teacherId: 'ID_DE_UM_PROFESSOR',
      },
    }
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
      this.$store.dispatch('test/createTest', payload)
    },
    editTest(test) {
      this.$router.push({ path: `/professor/provas/${test.id}` })
    },
  },
  computed: {
    ...mapState({
      tests: (state) => state.test.tests,
    }),
  },
  mounted() {
    this.$store.dispatch('test/getTests')
  },
  layout(context) {
    return 'professor'
  },
  middleware: ['auth'],
  components: { SelectedQuestions, SelectQuestions },
}
</script>
