export default {
  selectQuestion({ commit }, payload) {
    commit('SELECT_QUESTION', payload)
  },
  deselectQuestion({ commit }, payload) {
    commit('DESELECT_QUESTION', payload)
  },
  clearSelectedQuestions({ commit }) {
    commit('CLEAR_SELECTED_QUESTIONS')
  },
}
