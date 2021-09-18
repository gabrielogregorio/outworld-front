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
