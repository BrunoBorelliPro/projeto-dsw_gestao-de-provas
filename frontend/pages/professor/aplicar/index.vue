<template>
  <div class="container">
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provas: [
        {
          id: '1',
          title: 'Prova 1',
          teacherId: 'ID_DE_UM_PROFESSOR',
        },
        {
          id: '2',
          title: 'Prova 2',
          teacherId: 'ID_DE_UM_PROFESSOR',
        },
        {
          id: '3',
          title: 'Prova 3',
          teacherId: 'ID_DE_UM_PROFESSOR',
        },
      ],
    }
  },
  layout(context) {
    return 'professor'
  },
  middleware: ['auth'],
}
</script>

<style scoped></style>
