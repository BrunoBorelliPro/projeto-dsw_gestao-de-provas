export default {
  async getStudents({ commit }) {
    const res = await this.$axios.$get('/student')

    commit('STORE_STUDENTS', res)
  },
  async getStudentById({ commit }, payload) {
    const res = await this.$axios.$get(`/student/${payload}`)
    commit('STORE_STUDENT', res)
  },
  async createStudent({ commit }, payload) {
    const res = await this.$axios.$post('/student', payload)
    commit('STORE_STUDENT', res)
  },
  async updateStudent({ commit }, payload) {
    const res = await this.$axios.$put(`/student/${payload.id}`, payload)
    commit('UPDATE_STUDENT', res)
  },
  async deleteStudent({ commit }, payload) {
    await this.$axios.$delete(`/student/${payload}`)
    commit('DELETE_STUDENT', payload)
  },
}
