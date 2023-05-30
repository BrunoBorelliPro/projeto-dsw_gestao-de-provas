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
          <ToSeeQuestionCard :question="question" :number="index + 1" />
        </div>
      </div>
      <div class="student-list">
        <div
          class="student-card"
          :class="{ selected: studentsToApply.includes(student.id) }"
          v-for="student in students"
          :key="student.id"
          v-on:click="() => selectStudent(student.id)"
        >
          <h1 class="student-name">{{ student.name }}</h1>
        </div>
      </div>
      <div class="date">
        <input type="datetime-local" required v-model="available_until" />
      </div>

      <div class="buttons">
        <button class="btn btn-primary" v-on:click="() => applyTest()">
          Aplicar prova
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ToSeeQuestionCard from '../../../../components/questions/professor/ToSeeQuestionCard.vue'

export default {
  data() {
    return {
      test: {},
      available_until: '',

      studentsToApply: [],
    }
  },

  computed: {
    ...mapState({
      students: (state) => state.students.students,
      tests: (state) => state.test.tests,
    }),
  },
  mounted() {
    this.$store.dispatch('students/getStudents')
    this.$store.dispatch('test/getTestById', this.$route.params.id).then(() => {
      this.test = this.tests.find((test) => test.id === this.$route.params.id)
    })
  },
  methods: {
    selectStudent(id) {
      console.log(this.studentsToApply)
      if (this.studentsToApply.includes(id)) {
        this.studentsToApply = this.studentsToApply.filter(
          (studentId) => studentId !== id
        )
      } else {
        this.studentsToApply.push(id)
      }
    },

    applyTest() {
      if (this.studentsToApply.length === 0) {
        alert('Selecione pelo menos um aluno')
        return
      }
      if (this.available_until === '') {
        alert('Selecione uma data')
        return
      }

      const payload = {
        test_id: this.$route.params.id,
        students_id: this.studentsToApply,
        available_until: this.available_until,
      }
      this.$store.dispatch('test/applyTest', payload)
    },
  },
  layout(context) {
    return 'professor'
  },
  name: 'QuestoesPage',
  middleware: ['auth'],
  components: { ToSeeQuestionCard },
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
