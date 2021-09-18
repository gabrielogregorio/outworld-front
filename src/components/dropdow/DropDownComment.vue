<template>
  <div class="dropdown-item">
    <button @click="myFunction()" class="dropbtn">...</button>
    <div id="myDropdown" :class="showDrop ? 'dropdown-content show' : 'dropdown-content'">
      <button @click="deleteComment()" >Excluir</button>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'DropDownComment',
  data() {
    return {
      showDrop: false
    }
  },
  methods: {
    myFunction() {
      this.showDrop = !this.showDrop
    },

    deleteComment() {
      this.$emit('deleteComment', '')
    }
  }
}
</script>
