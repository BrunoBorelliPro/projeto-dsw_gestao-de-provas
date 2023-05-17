export default {
  STORE_APPLIED_TESTS(state, payload) {
    state.appliedTests = payload
  },
  STORE_APPLIED_TEST(state, payload) {
    if (!state.appliedTests.find((test) => test.id === payload.id)) {
      state.appliedTests.push(payload)
    }
  },
}
