<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>Registrar</h1>
      </div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="aluno@email.com"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="************"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Confirmar Senha"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.repeatPassword"
            type="password"
            placeholder="************"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Nome" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.name"
            placeholder="Aluno da Silva"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5">
          <b-form-checkbox
            id="input-5"
            v-model="form.isTeacher"
            type="checkbox"
          >
            É professor?</b-form-checkbox
          >
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
        repeatPassword: '',
        name: '',
        isTeacher: false,
      },
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (!this.validate()) return
      const route = this.form.isTeacher ? '/teachers' : '/students'
      this.$axios
        .post(`${route}`, {
          email: this.form.email,
          name: this.form.name,
        })
        .then((response) => {
          console.log(response)
          const userId = response.data.id
          this.$axios
            .post(`${process.env.AUTH_URL}/users`, {
              name: this.form.name,
              email: this.form.email,
              password: this.form.password,
              user_id: userId,
              isTeacher: this.form.isTeacher,
            })
            .then((response) => {
              console.log(response)

              alert('Registrado com sucesso')
              this.$router.push('/auth/login')
            })
        })
        .catch((error) => {
          alert('Erro ao registrar')
          console.log(error)
        })
    },
    onReset(event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
    },

    validate() {
      if (this.form.password !== this.form.repeatPassword) {
        alert('Senhas não conferem')
        return false
      }
      return true
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
