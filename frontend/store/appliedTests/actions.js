export default {
  async getAppliedTests({ commit }, payload) {
    const res = await this.$api.appliedTests.students.getAll(payload)
    commit('STORE_APPLIED_TESTS', res)
  },

  async getAppliedTestById({ commit }, payload) {
    const res = await this.$api.appliedTests.getAppliedTestById(payload)
    commit('STORE_APPLIED_TEST', res)
  },
}
