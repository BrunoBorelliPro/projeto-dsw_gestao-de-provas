export default {
  updateResponse({ commit }, response) {
    commit('UPDATE_REPONSE', response)
  },
  resetResponseTest({ commit }) {
    commit('RESET_RESPONSE')
  },

  async submitTest({ commit, state }, response) {
    console.log(response)

    await this.$api.responseTest.submitTest(response)
  },
}
