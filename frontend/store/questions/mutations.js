export default {
  STORE_QUESTION(state, payload) {
    state.questions.push(payload)
  },
  STORE_QUESTIONS(state, payload) {
    state.questions = payload
  },

  DELETE_QUESTION(state, payload) {
    state.questions = state.questions.filter(
      (question) => question.id !== payload
    )
  },
  UPDATE_QUESTION(state, payload) {
    state.questions = state.questions.map((question) =>
      question.id === payload.id ? payload : question
    )
  },
}
