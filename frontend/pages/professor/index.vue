<template>
  <div class="container"></div>
</template>

<script>
export default {
  layout(context) {
    return 'professor'
  },
  middleware: ['auth'],
}
</script>
