<template>
  <section>
    <div class="form">
      <h1>Fazer login</h1>
      <label for="email">E-mail: </label>
      <input type="email" name="email" id="email" placeholder="your email" v-model="email">

      <label for="password">Password: </label>
      <input type="password" name="password" id="password" placeholder="your password" v-model="password">

      <a href="/Cadastro">Fazer cadastro</a>
      <button @click="login()">Login</button><br>
  </div>
  </section>
</template>


<script>
import axios from 'axios';
import { hostServer } from '../connections';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      token:''
    }
  },
  methods: {
    login(){ 
      axios.post(`${hostServer}/auth`, {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.push({name: 'Home'})
      }).catch(error =>{
        console.log(error)
        alert(error)
      })
    }
  }
}
</script>
