<template>
  <div class="question">
    <h2 class="question-title">
      <span>{{ number }}) </span>{{ question.content }}
    </h2>
    <div class="alternatives">
      <div v-if="question.question_type === 'multiple_choice'">
        <div v-for="(alternative, index) in question.alternatives" :key="index">
          <p>{{ index + 1 }}) {{ alternative.content }}</p>
        </div>
      </div>

      <div v-if="question.question_type === 'true_false'">
        <p>(V para verdadeiro e F para falso)</p>
        <div v-for="(alternative, index) in question.alternatives" :key="index">
          <p>( ) - {{ alternative.content }}</p>
        </div>
      </div>

      <div v-if="question.question_type === 'essay'">
        <TextAreaEssay :number="5" />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import TextAreaEssay from '../TextAreaEssay.vue'

export default {
  name: 'ToPrintQuestionCard',
  props: {
    question: {
      type: Object,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  mounted() {},
  data() {
    return {}
  },
  components: { TextAreaEssay },
}
</script>

<style scoped>
.question {
  margin-bottom: 2rem;
}
.question-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}
.question-essay-response {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  padding: 12px 20px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
}
</style>
