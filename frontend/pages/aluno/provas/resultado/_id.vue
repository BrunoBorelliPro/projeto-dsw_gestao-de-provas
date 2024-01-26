<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h1>{{ appliedTest.title }}</h1>
        <h3>Aluno: {{ appliedTest.student.name }}</h3>
      </div>

      <div class="appliedTest" v-if="appliedTest.ResponseTest.length > 0">
        <div class="appliedTest__grade">
          <p>
            Nota:
            {{
              appliedTest.ResponseTest[0]
                ? appliedTest.ResponseTest[0].grade
                : '-'
            }}
            / {{ appliedTest.applied_questions.length }}
          </p>
        </div>
        <div class="response_test__questions">
          <b-card
            v-for="(question, index) in appliedTest.applied_questions"
            :key="index"
            :title="
              question.question_type === 'multiple_choice'
                ? 'Multipla escolha'
                : question.question_type === 'true_false'
                ? 'Verdadeiro/Falso'
                : 'Dissertativa'
            "
            class="response_test__question"
          >
            <b-card-text class="overflow">
              {{ question.content }}
            </b-card-text>

            <b-card-text v-if="question.question_type === 'essay'">
              <div class="student-reponse">
                Resposta do Aluno:
                {{
                  appliedTest.ResponseTest[0]
                    ? appliedTest.ResponseTest[0].response_questions.find(
                        (response) => response.question_id === question.id
                      ).response
                    : '-'
                }}
              </div>
              <div class="correct-response">
                Resposta Correta:
                {{ question.response }}
              </div>
            </b-card-text>
            <b-card-text v-if="question.question_type === 'multiple_choice'">
              <div class="student-reponse">
                Resposta do Aluno:
                <b-card-text
                  v-for="(alternative, index1) in question.alternatives"
                  :key="index1"
                  class="response_test__question__alternative"
                >
                  {{ index1 + 1 }} - {{ alternative.content }} -
                  {{
                    appliedTest.ResponseTest[0].response_questions
                      .find((response) => response.question_id === question.id)
                      .alternatives.find(
                        (alternative_response) =>
                          alternative_response.alternative_id === alternative.id
                      )?.is_selected
                      ? '✅'
                      : '❌'
                  }}
                </b-card-text>
              </div>
              <div class="correct-response">
                Resposta do Correta:
                <b-card-text
                  v-for="(alternative, index1) in question.alternatives"
                  :key="index1"
                  class="response_test__question__alternative"
                >
                  {{ index1 + 1 }} - {{ alternative.content }} -
                  {{ alternative.is_correct ? '✅' : '❌' }}
                </b-card-text>
              </div>
            </b-card-text>
            <b-card-text v-if="question.question_type === 'true_false'">
              <div class="student-reponse">
                Resposta do Aluno:
                <b-card-text
                  v-for="(alternative, index1) in question.alternatives"
                  :key="index1"
                  class="response_test__question__alternative"
                >
                  {{ index1 + 1 }} - {{ alternative.content }} -
                  {{
                    appliedTest.ResponseTest[0].response_questions
                      .find((response) => response.question_id === question.id)
                      .alternatives.find(
                        (alternative_response) =>
                          alternative_response.alternative_id === alternative.id
                      )?.is_selected
                      ? '✅'
                      : '❌'
                  }}
                </b-card-text>
              </div>
              <div class="correct-response">
                Resposta do Correta:
                <b-card-text
                  v-for="(alternative, index1) in question.alternatives"
                  :key="index1"
                  class="response_test__question__alternative"
                >
                  {{ index1 + 1 }} - {{ alternative.content }} -
                  {{ alternative.is_correct ? '✅' : '❌' }}
                </b-card-text>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <div class="appliedTest__info">
          <div class="appliedTest__info__date">
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

      <div class="notRespondedTest" v-else>
        <h3>Aluno ainda não respondeu a prova</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProvaAplicada',
  layout: 'aluno',

  async asyncData({ $api, $cookies, route }) {
    try {
      console.log($api)
      const appliedTest = await $api.appliedTests.getAllMakedByStudent(
        route.params.id
      )
      console.log(appliedTest)
      return { appliedTest }
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
  flex-direction: column;
  margin-bottom: 20px;
}
.title h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 10px;
}

.appliedTest {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.appliedTest__grade {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-bottom: 20px;
}

.appliedTest__grade p {
  font-size: 1.2rem;
  font-weight: 400;
  color: #000;
}
</style>
