<template>
  <div class="dropdown">
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


<style scoped>
.dropdown {
  position: relative;
}

.dropbtn {
  background-color: transparent;
  color: var(--color-4);
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.5rem;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: transparent;
  color: var(--color-4);
}

.dropdown-content {
  display: none;
  position: absolute;
  left: -50px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content button { 
  background-color: var(--background-2-transparent);
  width: 100%;
  height: 100%;
  outline: none;
  cursor: pointer;
  border: 0;
  color: var(--color-4);
  padding: 8px 20px;
  text-align: left;
  text-decoration: none;
  display: block;
}

.dropdown-content button:hover, .dropdown-content a:hover  {
  background-color: var(--background-3);
}

.show {
  display: block;
}

</style>
