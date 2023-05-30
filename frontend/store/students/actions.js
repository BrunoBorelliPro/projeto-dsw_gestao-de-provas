export default {
  async getStudents({ commit }) {
    const res = await this.$axios.$get('/students', {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_STUDENTS', res)
  },
  async getStudentById({ commit }, payload) {
    const res = await this.$axios.$get(`/students/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('STORE_STUDENT', res)
  },
  async createStudent({ commit }, payload) {
    const res = await this.$axios.$post('/students', payload, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('STORE_STUDENT', res)
  },
  async updateStudent({ commit }, payload) {
    const res = await this.$axios.$put(`/students/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('UPDATE_STUDENT', res)
  },
  async deleteStudent({ commit }, payload) {
    await this.$axios.$delete(`/students/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('DELETE_STUDENT', payload)
  },
}
