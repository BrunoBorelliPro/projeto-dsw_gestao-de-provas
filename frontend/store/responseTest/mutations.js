export default {
  UPDATE_REPONSE(state, response) {
    console.log('UPDATE_REPONSE', response)
    if (
      state.questions.filter((question) => question.id === response.questionId)
        .length === 0
    ) {
      state.questions.push({
        id: response.questionId,
        response: response.response,
        question_type: response.question_type,
      })
      return
    }

    // If the question is in the array, update it
    state.questions = state.questions.map((question) => {
      if (question.id === response.questionId) {
        question.response = response.response
      }
      return question
    })
  },

  RESET_RESPONSE(state) {
    state.questions = []
  },
}
