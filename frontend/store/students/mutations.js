export default {
  STORE_STUDENT(state, payload) {
    console.log('STORE_STUDENT', payload)
    if (!state.students.includes(payload)) {
      state.students.push(payload)
    }
  },
  STORE_STUDENTS(state, payload) {
    state.students = payload
  },
  DELETE_STUDENT(state, payload) {
    state.students = state.students.filter((student) => student.id !== payload)
  },
  UPDATE_STUDENT(state, payload) {
    state.students = state.students.map((student) =>
      student.id === payload.id ? payload : student
    )
  },
}
