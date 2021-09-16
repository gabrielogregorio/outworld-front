<template> 
  <div v-if="activated === true" class="loading">Loading</div>
</template>

<script>
export default {
  name: 'BasicLoadingImage',
  components: {},
  props: {
    activated: Boolean
  },
  data() {
    return {
    }
  }
}
</script>


<style scoped>
.loading {
  animation: loading 2s infinite alternate;
}

@keyframes loading {
  0% {
    color: var(--background-1)
  }

  100% {
    color: var(--background-0)
  }
}
</style>
