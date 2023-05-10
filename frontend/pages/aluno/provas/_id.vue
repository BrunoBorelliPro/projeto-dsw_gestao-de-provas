<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>{{ test.title }}</h1>
      </div>
      <div class="questions">
        <div
          v-for="(question, index) in test.questions"
          :key="index"
          class="question"
        >
          <ToAnswerQuestionCard :question="question" :number="index + 1" />
        </div>
      </div>
      <div>
        <div class="buttons">
          <b-button variant="primary" @click="submitTest"
            >Enviar Prova</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToAnswerQuestionCard from '../../../components/questions/aluno/ToAnswerQuestionCard.vue'

export default {
  data() {
    return {
      test: {
        title: 'Prova 1',
        questions: [
          {
            content: 'questão 1',
            question_type: 'multiple_choice',
            alternatives: [
              {
                content: 'alternativa 1',
              },
              {
                content: 'alternativa 2',
              },
            ],
          },
          {
            content: 'questão 2',
            question_type: 'multiple_choice',
            alternatives: [
              {
                content: 'alternativa 1',
              },
              {
                content: 'alternativa 2',
              },
            ],
          },
          {
            content: 'questão 3',
            question_type: 'true_false',
            alternatives: [
              {
                content: 'alternativa 1',
              },
              {
                content: 'alternativa 2',
              },
            ],
          },
          {
            content:
              'questão 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis aliquet urna, nec consectetur sapien. Morbi ut fermentum leo, a efficitur mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed lorem metus, finibus quis ornare quis, semper eu leo. Duis dictum egestas mattis. Duis euismod id ex et vestibulum. Duis orci metus, finibus a imperdiet at, porta at magna. Proin condimentum lectus vel porttitor venenatis. Donec non dapibus nulla, vel vehicula augue. Mauris sodales neque nec tellus blandit, non ultricies urna pharetra. Pellentesque luctus commodo neque.',
            question_type: 'essay',
          },
        ],
      },
    }
  },
  layout(context) {
    return 'aluno'
  },
  name: 'QuestoesPage',
  middleware: ['auth'],
  components: { ToAnswerQuestionCard },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.questions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.buttons {
  width: 100%;
}
</style>
