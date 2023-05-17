export default {
  async getAppliedTests({ commit }, payload) {
    console.log('getAppliedTests', payload)
    const res = await this.$axios.$get(`/student/tests/student/${payload}`)
    commit('STORE_APPLIED_TESTS', res)
  },

  async getAppliedTestById({ commit }, payload) {
    const res = await this.$axios.$get(`/student/tests/${payload}`)
    commit('STORE_APPLIED_TEST', res)
  },
}
