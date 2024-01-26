export default {
  SELECT_QUESTION(state, payload) {
    state.selectedQuestions = state.selectedQuestions.filter(
      (question) => question.id !== payload.id
    )
    state.selectedQuestions.push(payload)
  },
  DESELECT_QUESTION(state, payload) {
    state.selectedQuestions = state.selectedQuestions.filter(
      (question) => question.id !== payload.id
    )
  },
  CLEAR_SELECTED_QUESTIONS(state) {
    state.selectedQuestions = []
  },
}
