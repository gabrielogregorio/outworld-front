<template>
  <div class="dropdown-item-post">
    <button @click="myFunction()" class="dropbtn">...</button>
    <div id="myDropdown" :class="showDrop ? 'dropdown-content show' : 'dropdown-content'">
      <button @click="editPostRedirect()">Editar</button>
      <button @click="deletePost()" >Excluir</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DropDown',
  data() {
    return {
      showDrop: false
    }
  },
  methods: {
    myFunction() {
      this.showDrop = !this.showDrop
    },

    editPostRedirect() {
      this.$emit('editPostRedirect', '')
    },

    deletePost() {
      this.$emit('deletePost', '')
    }
  }
}
</script>
