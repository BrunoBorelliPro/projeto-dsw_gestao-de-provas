export default {
  async createQuestion({ commit }, payload) {
    const res = await this.$api.questions.createQuestion(payload)
    commit('STORE_QUESTION', res)
  },

  async getQuestions({ commit }) {
    const res = await this.$api.questions.getQuestions()
    commit('STORE_QUESTIONS', res)
  },

  async getQuestion({ commit }, payload) {
    const res = await this.$api.questions.getQuestions(payload)
    commit('STORE_QUESTION', res)
  },
  async deleteQuestion({ commit }, payload) {
    await this.$api.questions.deleteQuestion(payload)
    commit('DELETE_QUESTION', payload)
  },

  async updateQuestion({ commit }, payload) {
    const res = await this.$api.questions.updateQuestion(payload)
    commit('UPDATE_QUESTION', res)
  },
}
