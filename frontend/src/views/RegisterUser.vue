<template>
  <section>
    <div class="container">
      <h1>Criar usuário</h1>
        <label for="name">Seu nome </label>
        <input type="name" name="name" id="name" placeholder="Seu nome" v-model="name">

        <label for="email">E-mail: </label>
        <input type="email" name="email" id="email" placeholder="Seu e-mail" v-model="email">

        <label for="password">Password: </label>
        <input type="password" name="password" id="password" placeholder="Uma senha" v-model="password">
        
        <button @click="cadastrar()">Login</button><br>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterUser',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },

  methods: {
    cadastrar() {
      axios.post('http://localhost:3333/user', {
        name: this.name,
        email: this.email,
        password: this.password
      } ).then(() => {
        this.$router.push({name: 'Home'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    }
  }
}
</script>
