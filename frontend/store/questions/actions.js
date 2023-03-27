export default {
  async createQuestion({ commit }, payload) {
    const res = await this.$axios.$post('/questions', payload)

    commit('STORE_QUESTION', res)
  },

  async getQuestions({ commit }) {
    const res = await this.$axios.$get('/questions')

    commit('STORE_QUESTIONS', res)
  },

  async getQuestion({ commit }, payload) {
    const res = await this.$axios.$get(`/questions/${payload}`)

    commit('STORE_QUESTION', res)
  },
  async deleteQuestion({ commit }, payload) {
    await this.$axios.$delete(`/questions/${payload}`)
    commit('DELETE_QUESTION', payload)
  },

  async updateQuestion({ commit }, payload) {
    const res = await this.$axios.$put(
      `/questions/${payload.id}`,
      payload.question
    )

    commit('UPDATE_QUESTION', res)
  },
}
