export default {
  async getTests({ commit }) {
    console.log('getTests')

    const res = await this.$api.tests.getTests()
    commit('STORE_TESTS', res)
  },
  async getTestById({ commit }, payload) {
    console.log('getTestById')
    const res = await this.$api.tests.getTests(payload)
    commit('STORE_TEST', res)
  },
  async createTest({ commit }, payload) {
    const res = await this.$api.tests.createTest(payload)
    commit('STORE_TEST', res)
  },
  async updateTest({ commit }, payload) {
    const res = await this.$api.tests.updateTest(payload)
    commit('UPDATE_TEST', res)
  },
  async deleteTest({ commit }, payload) {
    await this.$api.tests.deleteTest(payload)
    commit('DELETE_TEST', payload)
  },

  async applyTest({ commit }, payload) {
    await this.$api.tests.applyTest({
      test_id: payload.test_id,
      students_id: payload.students_id,
      available_until: payload.available_until,
    })
  },
}
