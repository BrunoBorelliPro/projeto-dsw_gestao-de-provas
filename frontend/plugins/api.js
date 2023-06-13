export default function API(context, inject) {
  this.$axios.setHeader('Content-Type', 'application/json')
  this.$axios.setHeader()
  const api = {
    students: {
      get: async () => await this.$axios.$get('/students'),
      post: async (data) =>
        await this.$axios.$post('/students', { data: JSON.stringify(data) }),
      put: async (id, data) =>
        await this.$axios.$put(`/students/${id}`, {
          data: JSON.stringify(data),
        }),
      delete: async (id) => await this.$axios.$delete(`/students/${id}`),
      getById: async (id) => await this.$axios.$get(`/students/${id}`),
    },
    teachers: {},
    tests: {},
    questions: {
      get: async () => await this.$axios.$get('/questions'),
      post: async (data) =>
        await this.$axios.$post('/questions', JSON.stringify(data)),
      put: async (id, data) =>
        await this.$axios.$put(`/questions/${id}`, JSON.stringify(data)),
      delete: async (id) => await this.$axios.$delete(`/questions/${id}`),
      getById: async (id) => await this.$axios.$get(`/questions/${id}`),
    },
    responses: {},
    appliedTests: {},
  }
  inject('api', api)
}
