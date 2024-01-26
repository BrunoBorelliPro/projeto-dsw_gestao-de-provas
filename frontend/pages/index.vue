<template>
  <div class="container"></div>
</template>
<script>
export default {
  name: 'IndexPage',
  layout(context) {
    return 'guest'
  },
  middleware: ['auth', 'toHome'],
}
</script>
