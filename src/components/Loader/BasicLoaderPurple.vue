<template> 
  <div v-if="activated === true" class="loading-posts-purple">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'BasicLoaderPurple',
  components: {},
  props: {
    activated: Boolean
  }
}
</script>
