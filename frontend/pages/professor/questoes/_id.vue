<template>
  <div class="container">
    <div class="box">
      <QuestionForm
        :edit-question-id="$route.params.id"
        :submit-btn-text="'Editar Questão'"
        :title="'Editar Questão'"
      />
    </div>
  </div>
</template>

<script>
import QuestionForm from '../../../components/questions/QuestionForm.vue'

export default {
  components: {
    QuestionForm,
  },
  layout(context) {
    return 'professor'
  },
}
</script>
