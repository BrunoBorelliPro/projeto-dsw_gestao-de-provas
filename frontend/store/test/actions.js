export default {
  async getTests({ commit }) {
    const res = await this.$axios.$get('/tests', {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_TESTS', res)
  },
  async getTestById({ commit }, payload) {
    const res = await this.$axios.$get(`/tests/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_TEST', res)
  },
  async createTest({ commit }, payload) {
    const res = await this.$axios.$post('/tests', payload, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })

    commit('STORE_TEST', res)
  },
  updateTest({ commit }, payload) {
    this.$axios
      .$put(`/tests/${payload.id}`, payload, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get('token').token}`,
        },
      })
      .then((res) => {
        commit('UPDATE_TEST', res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async deleteTest({ commit }, payload) {
    await this.$axios.$delete(`/tests/${payload}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token').token}`,
      },
    })
    commit('DELETE_TEST', payload)
  },

  async applyTest({ commit }, payload) {
    console.log(payload)
    await this.$axios.$post(
      `/appliedTests`,
      {
        test_id: payload.test_id,
        students_id: payload.students_id,
        available_until: payload.available_until,
      },
      {
        headers: {
          Authorization: `Bearer ${this.$cookies.get('token').token}`,
        },
      }
    )
  },
}
