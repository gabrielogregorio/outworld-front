<template> 
  <div v-if="activated === true" class="loading-post-basic">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'BasicLoader',
  components: {},
  props: {
    activated: Boolean
  }
}
</script>
