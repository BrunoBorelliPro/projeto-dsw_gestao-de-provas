<template>
  <div class=".container">
    <QuestionForm
      :edit-question-id="$route.params.id"
      :submit-btn-text="'Editar Questão'"
      :title="'Editar Questão'"
    />
  </div>
</template>

<script>
import QuestionForm from '../../../components/questions/QuestionForm.vue'

export default {
  components: {
    QuestionForm,
  },
}
</script>
