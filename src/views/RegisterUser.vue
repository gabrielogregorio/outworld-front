<template>
<div class="login-register">
  <section>
   <div v-if="activated === true"  class="form container-500">
     <h1>Criando a conta</h1>
     <div class="loading-posts">
       <div></div>
     </div>
   </div>


   <div v-if="activated === false"  class="form container-500">
      <h1>Criar conta</h1>
      <h2>Está preparado para experimentar uma nova experiência?</h2>

      <span class="msg-error" v-if="errorMsg !== ''" >{{errorMsg}}</span>

      <label for="name">Seu nome e sobrenome</label>
      <input type="name" name="name" id="name" placeholder="Seu nome" v-model="name">

      <label for="email">Seu e-mail: </label>
      <input type="email" name="email" id="email" placeholder="Seu e-mail" v-model="email">

      <label for="username">Um nome de usuário:</label>
      <input type="text" name="username" id="username" placeholder="Um nome de usuario" v-model="username">

      <label for="password">Uma senha: </label>
      <input type="password" name="password" id="password" placeholder="Uma senha" v-model="password">
  
      <router-link to="/Login">Fazer login</router-link>
      <button @click="cadastrar()">Cadastrar</button><br>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios';
import { hostServer} from '../connections';
import getHeader from '../getToken';

export default {
  name: 'RegisterUser',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      username: '',
      errorMsg: '',
      activated: false
    }
  },

  methods: {
    cadastrar() {
      this.activated = true
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        username: this.username
      }

      axios.post(`${hostServer}/user`, data, getHeader()).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.push({name: 'Home'})
      }).catch(error => {
        this.activated = false
        if(error.response?.status === 400) {
          this.errorMsg = 'Você precisa preencher todos os campos'
        } else if(error.response?.status === 409) {
          this.errorMsg = 'Este e-mail já está registrado, tente outro'
        } else {
          this.errorMsg = 'Por favor, verifique sua conexão com a internet'
          console.log(error)
        }
      })
    }
  }
}
</script>
