<template>
  <div class="question">
    <h2 class="question-title">
      <span>{{ number }}) </span>{{ question.content }}
    </h2>
    <div class="alternatives">
      <div v-if="question.question_type === 'multiple_choice'">
        <div v-for="(alternative, index) in question.alternatives" :key="index">
          <input
            type="radio"
            :id="alternative.id"
            :name="question.content"
            @change="updateResponse"
          />
          <label for="index">{{ alternative.content }}</label>
        </div>
      </div>

      <div v-if="question.question_type === 'true_false'">
        <div v-for="(alternative, index) in question.alternatives" :key="index">
          <input
            type="checkbox"
            :id="alternative.id"
            :name="question.content"
            @change="updateTrueFalse"
          />
          <label for="index">{{ alternative.content }}</label>
        </div>
      </div>

      <div v-if="question.question_type === 'essay'">
        <textarea
          type="text"
          :id="question.id"
          :name="question.content"
          class="question-essay-response"
          v-on:keyup="updateResponse"
        />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ToAnswerQuestionCard',

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
  computed: {
    ...mapState({
      responses: (state) => state.responseTest.questions,
    }),
  },
  mounted() {
    this.updateResponse(false)
  },
  methods: {
    updateTrueFalse(event) {
      if (event.target.checked) {
        this.responseTrueFalse.push(event.target.id)
      } else {
        this.responseTrueFalse = this.responseTrueFalse.filter(
          (r) => r !== event.target.id
        )
      }
      this.updateResponse(event)
    },
    updateResponse(event) {
      const response = {
        questionId: this.question.id,
        question_type: this.question.question_type,
      }
      if (!event) {
        response.response = ''
      } else if (this.question.question_type === 'true_false') {
        console.log(this.responseTrueFalse)
        response.response = [...this.responseTrueFalse]
      } else if (this.question.question_type === 'multiple_choice') {
        response.response = event.target.id
      } else {
        response.response = event.target.value
      }
      this.$store.dispatch('responseTest/updateResponse', response)
    },
  },
  data() {
    return {
      responseTrueFalse: [],
    }
  },
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
