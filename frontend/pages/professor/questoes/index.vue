<template>
  <div class=".container">
    <QuestionForm />
    <ListQuestions />
  </div>
</template>

<script>
import ListQuestions from '../../../components/questions/ListQuestions.vue'
import QuestionForm from '../../../components/questions/QuestionForm.vue'

export default {
  name: 'QuestoesPage',
  middleware: ['auth'],

  components: { QuestionForm, ListQuestions },
}
</script>
