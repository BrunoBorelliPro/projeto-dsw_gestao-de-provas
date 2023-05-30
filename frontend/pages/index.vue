<template>
  <div class="container"></div>
</template>
<script>
export default {
  name: 'IndexPage',
  middleware: ['auth', 'toHome'],
  layout(context) {
    return 'guest'
  },
}
</script>
