<template> 
  <div class="loader"></div>
</template>

<script>

export default {
  name: 'BasicLoader',
  data() {
  },
  props: {
    width: Number,
    minWidth: Number,
    height: Number,
    minHeight: Number
  },
  create() {},
  methods: {
  }
}
</script>


<style scoped>
.loader {
  display: block;
  min-height: 100px;
  min-width: 100px;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 7px 2px #00000055;
  animation: loader alternate 1s ease-in-out infinite;
}

@keyframes loader {
  0% {background-color: #00000022;}
  100% {background-color: #00000099;}
}
</style>