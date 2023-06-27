<template>
  <div class="container">
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  layout(context) {
    return 'guest'
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  created() {
    this.setToken('')
    this.setUser({})
    this.$router.push('/')
  },

  methods: {
    onReset(event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
    },

    setToken(token) {
      this.$cookies.set('token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    },
    setUser(user) {
      this.$cookies.set('user', user, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
}
.box {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}
</style>
