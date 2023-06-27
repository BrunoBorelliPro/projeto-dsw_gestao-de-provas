<template>
  <div class="container">
    <div class="box">
      <PrintTestComponent :test="test" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PrintTestComponent from '../../../../components/PrintTestComponent.vue'

export default {
  name: 'QuestoesPage',
  components: { PrintTestComponent },
  layout(context) {
    return 'aluno'
  },
  data() {
    return {
      test: {},
    }
  },

  computed: {
    ...mapState({
      appliedTests: (state) => state.appliedTests.appliedTests,
    }),
  },
  mounted() {
    this.$store
      .dispatch('appliedTests/getAppliedTestById', this.$route.params.id)
      .then(() => {
        const test = this.appliedTests.find(
          (test) => test.id === this.$route.params.id
        )
        this.test = test
      })
  },
  methods: {
    toPdf() {
      const doc = this.$JsPDF()

      doc.html(document.querySelector('#printMe'), {
        callback: function (pdf) {
          pdf.save('prova.pdf')
        },
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650,
      })
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.test {
  display: inline-block;

  width: 100%;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.questions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.student-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;
}

.student-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.selected {
  background-color: #acacac;
}

.student-card:hover {
  background-color: #acacac;
}

.student-name {
  font-size: 20px;
  font-weight: bold;
}

.buttons {
  width: 100%;
}
</style>
