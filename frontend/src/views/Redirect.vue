<template>
  <p>Faça login ou cadastro na plataforma</p>
</template>

<script>
export default {
  name: "Redirect",
  created() {
    var token = localStorage.getItem('token');
    if (token == '' || token == undefined) {
      this.$router.push({name: 'Login'})
    } else {
      this.$router.push({name: 'Home'})
    }

  }
}
</script>
