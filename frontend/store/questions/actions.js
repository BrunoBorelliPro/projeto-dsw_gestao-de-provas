export default {
  async createQuestion({ commit }, payload) {
    const res = await this.$axios.$post('/questions', payload, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_QUESTION', res)
  },

  async getQuestions({ commit }) {
    const res = await this.$axios.$get('/questions', {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_QUESTIONS', res)
  },

  async getQuestion({ commit }, payload) {
    const res = await this.$axios.$get(`/questions/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_QUESTION', res)
  },
  async deleteQuestion({ commit }, payload) {
    await this.$axios.$delete(`/questions/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('DELETE_QUESTION', payload)
  },

  async updateQuestion({ commit }, payload) {
    const res = await this.$axios.$put(
      `/questions/${payload.id}`,
      payload.question,
      {
        headers: {
          Authorization: `Bearer ${this.$cookies.get('token').token}`,
        },
      }
    )

    commit('UPDATE_QUESTION', res)
  },
}
