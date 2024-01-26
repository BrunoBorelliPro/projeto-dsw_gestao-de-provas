<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>Login</h1>
      </div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Enter password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button block type="submit" variant="primary">Login</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
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

  methods: {
    async onSubmit(event) {
      event.preventDefault()

      await this.$api.auth.login(this.form.email, this.form.password)
      this.$router.push(this.$route.query.redirect || '/')
    },

    onReset(event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
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
