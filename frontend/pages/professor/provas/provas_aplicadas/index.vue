<template>
  <div class="container">
    <div class="box">
      <div class="title"><h1>Provas Aplicadas</h1></div>
      <div class="applied_tests">
        <div
          v-for="appliedTest in appliedTests"
          :key="appliedTest.id"
          class="applied_test"
          @click="() => goToAppliedTest(appliedTest.id)"
        >
          <div class="applied_test__title">
            <h2>{{ appliedTest.title }}</h2>
            <h3>Aluno: {{ appliedTest.student.name }}</h3>
          </div>
          <div class="applied_test__grade">
            <p>
              Nota:
              {{
                appliedTest.ResponseTest[0]
                  ? appliedTest.ResponseTest[0].grade
                  : '-'
              }}
              /
              {{ appliedTest.applied_questions?.length }}
            </p>
          </div>
          <div class="applied_test__info">
            <div class="applied_test__info__date">
              <p>
                Data Inicio:
                {{ new Date(appliedTest.created_at).toLocaleDateString() }}
              </p>
              <p>
                Data Fim:
                {{ new Date(appliedTest.available_until).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProvasAplicadas',
  layout: 'professor',
  middleware: 'auth',

  async asyncData({ $api }) {
    try {
      const appliedTests = await $api.appliedTests.getAllByTeacher()
      console.log(appliedTests)

      return {
        appliedTests,
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    goToAppliedTest(id) {
      this.$router.push(`/professor/provas/provas_aplicadas/${id}`)
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 9px;
}
.box {
  width: 100%;
  max-width: 800px;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.applied_tests {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.applied_test {
  width: 100%;
  max-width: 600px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}

.applied_test__title {
  margin-bottom: 10px;
}

.applied_test__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
