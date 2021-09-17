<template> 
  <div v-if="activated === true" class="loading-posts">
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


<style scoped>
.loading-posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  min-height: 50px;
  margin: 0;
  border: 0;
  padding: 10px 0;
}

.loading-posts div {
  border: 5px solid transparent;
  border-top: 5px solid var(--background-2);
  border-left: 5px solid var(--background-2);
  height: 50px;
  width: 50px;
  border-radius: 50%;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
