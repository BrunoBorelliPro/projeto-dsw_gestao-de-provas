<template>
  <div class="container">
    <div class="test" id="printMe">
      <div class="aluno_data">
        <p>Nome:</p>
        <p>Prontuário:</p>
      </div>
      <div class="title">
        <h1>{{ test.title }}</h1>
      </div>
      <div class="questions">
        <div
          v-for="(question, index) in test.questions"
          :key="index"
          class="question"
        >
          <ToPrintQuestionCard :question="question" :number="index + 1" />
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="btn btn-primary" v-on:click="() => toPdf()">
        Imprimir prova
      </button>
    </div>
  </div>
</template>

<script>
import ToPrintQuestionCard from './questions/professor/ToPrintQuestionCard.vue'

export default {
  props: {
    test: {
      type: Object,
      required: true,
    },
  },

  methods: {
    toPdf() {
      const doc = this.$JsPDF()

      doc.html(document.querySelector('#printMe'), {
        callback: function (pdf) {
          pdf.save('prova.pdf')
        },
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650,
      })
    },
  },

  name: 'PrintTestComponent',
  components: { ToPrintQuestionCard },
}
</script>

<style scoped>
.test {
  display: inline-block;

  width: 100%;
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
  width: 100%;
}

.student-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;
}

.student-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.selected {
  background-color: #acacac;
}

.student-card:hover {
  background-color: #acacac;
}

.student-name {
  font-size: 20px;
  font-weight: bold;
}

.buttons {
  width: 100%;
}
</style>
