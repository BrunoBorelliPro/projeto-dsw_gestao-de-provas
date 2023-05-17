export default {
  STORE_TEST(state, payload) {
    console.log('STORE_TEST', payload)
    if (!state.tests.find((test) => test.id === payload.id)) {
      state.tests.push(payload)
    }
  },
  STORE_TESTS(state, payload) {
    state.tests = payload
  },
  DELETE_TEST(state, payload) {
    state.tests = state.tests.filter((test) => test.id !== payload)
  },
  UPDATE_TEST(state, payload) {
    state.tests = state.tests.map((test) =>
      test.id === payload.id ? payload : test
    )
  },
}
