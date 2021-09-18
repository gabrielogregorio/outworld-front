<template>
<div class="login-register">
  <section>
   <div v-if="activated === true"  class="form container-500">
     <h1>Fazendo Login</h1>
     <div class="loading-posts">
       <div></div>
     </div>
   </div> 

   <div v-if="activated === false" class="form container-500">
      <h1>Fazer login</h1>
      <h2>Uma rede social diferente</h2>
        <span v-if="errorMsg !== ''" >{{errorMsg}}</span>

        <label for="email">E-mail: </label>
        <input type="email" name="email" id="email" placeholder="Digite seu e-mail" v-model="email">

        <label for="password">Password: </label>
        <input type="password" name="password" id="password" placeholder="Digite sua senha" v-model="password">

        <router-link to="/Cadastro">Criar uma conta</router-link>

        <button @click="login()">Login</button><br>
      </div>
  </section>
</div>
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
      errorMsg: '',
      activated: false
    }
  },
  created() {
    try {
      localStorage.removeItem('token')
    } catch(error) {console.log(error)}
  },
  methods: {
    login(){ 
      this.activated = true
      axios.post(`${hostServer}/auth`, {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.push({name: 'Home'})
      }).catch(error =>{
        console.log('erro')
        this.activated = false
        if(error.response?.status === 404) {
          this.errorMsg = 'Usuário não cadastrado no sistema'
        }else if(error.response?.status === 403) {
          this.errorMsg = 'Senha Inválida'
        } else {
          //this.errorMsg = 'Pane no sistema! Alguém me desconfigurou!'
          this.errorMsg = 'Por favor, verifique sua conexão com a internet'
        }
      })
    }
  }
}
</script>
