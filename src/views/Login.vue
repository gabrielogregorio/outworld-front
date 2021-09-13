<template>
  <section>
    <div class="form container">
      <h1>Fazer login</h1>

      <span v-if="errorMsg !== ''" >{{errorMsg}}</span>
 
      <label for="email">E-mail: </label>
      <input type="email" name="email" id="email" placeholder="Digite seu e-mail" v-model="email">

      <label for="password">Password: </label>
      <input type="password" name="password" id="password" placeholder="Digite sua senha" v-model="password">
      
      <router-link to="/Cadastro">Fazer cadastro</router-link>
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
      token:'',
      errorMsg: ''
    }
  },
  created() {
    try {
      localStorage.removeItem('token')
    } catch(error) {console.log(error)}
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
        if(error.response.status === 404) {
          this.errorMsg = 'Usuário não cadastrado no sistema'
        }else if(error.response.status === 403) {
          this.errorMsg = 'Senha Inválida'
        } else {
          this.errorMsg = 'Pane no sistema! Alguém me desconfigurou!'
        }
      })
    }
  }
}
</script>


<style scoped>
span {
  margin-top: 10px;
  padding: 10px;
  background: #470c8a;
  color:white;
  border-radius: 5px;
  text-align: center;
}
</style>