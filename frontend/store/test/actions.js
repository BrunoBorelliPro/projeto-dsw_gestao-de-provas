export default {
  async getTests({ commit }) {
    const res = await this.$axios.$get('/tests')

    commit('STORE_TESTS', res)
  },
  async getTestById({ commit }, payload) {
    const res = await this.$axios.$get(`/tests/${payload}`)

    commit('STORE_TEST', res)
  },
  async createTest({ commit }, payload) {
    const res = await this.$axios.$post('/tests', payload)

    commit('STORE_TEST', res)
  },
  updateTest({ commit }, payload) {
    this.$axios
      .$put(`/tests/${payload.id}`, payload)
      .then((res) => {
        commit('UPDATE_TEST', res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async deleteTest({ commit }, payload) {
    await this.$axios.$delete(`/tests/${payload}`)
    commit('DELETE_TEST', payload)
  },
}
