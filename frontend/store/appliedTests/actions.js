export default {
  async getAppliedTests({ commit }, payload) {
    console.log('getAppliedTests', payload)
    const res = await this.$axios.$get(`/appliedTests/students/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('STORE_APPLIED_TESTS', res)
  },

  async getAppliedTestById({ commit }, payload) {
    const res = await this.$axios.$get(`/appliedTests/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('STORE_APPLIED_TEST', res)
  },
}
