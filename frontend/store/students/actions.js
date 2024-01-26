export default {
  async getStudents({ commit }) {
    const res = await this.$api.students.getStudents()

    commit('STORE_STUDENTS', res)
  },
  async getStudentById({ commit }, payload) {
    const res = await this.$axios.$api.students.getStudents(payload)
    commit('STORE_STUDENT', res)
  },
  async createStudent({ commit }, payload) {
    const res = await this.$api.students.createStudent(payload)
    commit('STORE_STUDENT', res)
  },
  async updateStudent({ commit }, payload) {
    const res = await this.$api.students.updateStudent(payload)
    commit('UPDATE_STUDENT', res)
  },
  async deleteStudent({ commit }, payload) {
    await this.$api.students.deleteStudent(payload)
    commit('DELETE_STUDENT', payload)
  },
}
