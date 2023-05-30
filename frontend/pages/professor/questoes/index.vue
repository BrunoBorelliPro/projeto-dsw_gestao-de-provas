<template>
  <div class="container">
    <div class="box">
      <QuestionForm />
      <ListQuestions />
    </div>
  </div>
</template>

<script>
import ListQuestions from '../../../components/questions/ListQuestions.vue'
import QuestionForm from '../../../components/questions/QuestionForm.vue'

export default {
  name: 'QuestoesPage',
  middleware: ['auth'],

  components: { QuestionForm, ListQuestions },

  layout(context) {
    return 'professor'
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.box {
  width: 100%;
  max-width: 800px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 30px;
}
</style>
