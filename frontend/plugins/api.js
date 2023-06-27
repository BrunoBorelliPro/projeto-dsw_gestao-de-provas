export default function API(context, inject) {
  context.$axios.setHeader('Content-Type', 'application/json')
  context.$axios.setHeader(
    'Authorization',
    `Bearer ${context.$cookies.get('token')?.token}`
  )
  const api = {
    appliedTests: {
      students: {
        async getAll(studentId = '') {
          const tests = await context.$axios.$get(
            `/appliedTests/students/${studentId}`
          )

          return tests
        },
      },
      async getAppliedTestById(appliedTestId = '') {
        const test = await context.$axios.$get(`/appliedTests/${appliedTestId}`)
        return test
      },

      async getAllMakedByStudent(testId = '') {
        const tests = await context.$axios.$get(
          `/appliedTests/getAllMakedByStudent/${testId}`
        )
        return tests
      },
      async getAllByTeacher(testId = '') {
        const tests = await context.$axios.$get(
          `/appliedTests/getAllByTeacher/${testId}`
        )
        return tests
      },
    },
    questions: {
      async createQuestion(question = {}) {
        const res = await context.$axios.$post('/questions', question)
        return res
      },

      async getQuestions(questionId = '') {
        const questions = await context.$axios.$get(`/questions/${questionId}`)
        return questions
      },

      async deleteQuestion(questionId = '') {
        const res = await context.$axios.$delete(`/questions/${questionId}`)
        return res
      },

      async updateQuestion(question = {}) {
        const res = await context.$axios.$put(
          `/questions/${question.id}`,
          question.question
        )
        return res
      },
    },
    responseTest: {
      async submitTest(response = {}) {
        const res = await context.$axios.$post(
          `/responseTest/${response.appliedTestId}`,
          response
        )
        return res
      },
    },
    students: {
      async getStudents(studentId = '') {
        const students = await context.$axios.$get(`/students/${studentId}`)
        return students
      },
      async createStudent(student = {}) {
        const res = await context.$axios.$post('/students', student)
        return res
      },
      async updateStudent(student = {}) {
        const res = await context.$axios.$put(
          `/students/${student.id}`,
          student
        )
        return res
      },
      async deleteStudent(studentId = '') {
        const res = await context.$axios.$delete(`/students/${studentId}`)
        return res
      },
    },
    tests: {
      async getTests(testId = '') {
        const tests = await context.$axios.$get(`/tests/${testId}`)
        return tests
      },
      async createTest(test = {}) {
        const res = await context.$axios.$post('/tests', test)
        return res
      },
      async updateTest(test = {}) {
        const res = await context.$axios.$put(`/tests/${test.id}`, test)
        return res
      },
      async deleteTest(testId = '') {
        const res = await context.$axios.$delete(`/tests/${testId}`)
        return res
      },

      async applyTest(test = {}) {
        const res = await context.$axios.$post('/appliedTests', test)
        return res
      },
    },
    auth: {
      async setToken(token, exp) {
        await context.$cookies.set(
          'token',
          { token, exp },
          {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          }
        )
      },
      async setUser(user) {
        await context.$cookies.set('user', user, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      },
      async login(email = '', password = '') {
        try {
          const response = await context.$axios.$post(
            `${context.$config.authUrl}/login`,
            {
              email,
              password,
            },
            {
              withCredentials: true,
              crossDomain: true,
            }
          )
          const { token, exp } = response
          const user = {
            userId: response.userId,
            isTeacher: response.isTeacher,
          }
          await this.setToken(token, exp)
          await this.setUser(user)

          context.$axios.setHeader('Authorization', `Bearer ${token}`)
        } catch (error) {
          console.error(error)
          alert('Falha ao logar')
        }
      },
    },
  }
  inject('api', api)
}
