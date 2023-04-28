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

      <b-button variant="warning" @click="updateTest()">Editar Prova</b-button>
      <b-button variant="danger" @click="deleteTest()">Deletar Prova</b-button>
    </div>
    <SelectQuestions />
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
        questions: [],
      },
    }
  },
  methods: {
    updateTest() {
      const questionsIds =
        this.$store.state.selectedQuestions.selectedQuestions.map(
          (question) => question.id
        )
      const payload = {
        ...this.form,
        questions: questionsIds,
        id: this.$route.params.id,
      }
      this.$store.dispatch('test/updateTest', payload)
    },
    deleteTest(test) {
      this.$store.dispatch('test/deleteTest', this.$route.params.id)
      this.$router.push({ path: '/professor/provas' })
    },
  },
  computed: {
    ...mapState({
      tests: (state) => state.test.tests,
    }),
  },
  mounted() {
    this.$store
      .dispatch('test/getTestById', this.$route.params.id)
      .then(() => {
        const test = this.tests.find(
          (test) => test.id === this.$route.params.id
        )
        this.form.title = test.title
        this.form.teacherId = test.teacherId
        this.form.questions = test.questions
      })
      .then(() => {
        this.$store
          .dispatch('selectedQuestions/clearSelectedQuestions')
          .then(() => {
            this.form.questions.forEach((question) => {
              this.$store.dispatch('selectedQuestions/selectQuestion', question)
            })
          })
      })
  },
  middleware: ['auth'],
  components: { SelectedQuestions, SelectQuestions },
}
</script>
