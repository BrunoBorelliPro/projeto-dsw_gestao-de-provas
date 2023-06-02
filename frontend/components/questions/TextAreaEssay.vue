<template>
  <div class="textarea">
    <hr v-for="line in number" :key="line" />
  </div>
</template>

<script>
export default {
  name: 'TextAreaEssay',
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  mounted() {},
  data() {
    return {}
  },
}
</script>

<style scoped>
.textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 10px;
}
hr {
  border: 0;
  height: 1px;
  background: #333;
  margin: 10px;
  margin-bottom: 15px;
  width: 50vw;
}
</style>
