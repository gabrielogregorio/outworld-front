<template>
  <section>
    <div class="form container">
      <h1>Criar conta</h1>

      <span v-if="errorMsg !== ''" >{{errorMsg}}</span>

      <label for="name">Seu nome </label>
      <input type="name" name="name" id="name" placeholder="Seu nome" v-model="name">

      <label for="email">E-mail: </label>
      <input type="email" name="email" id="email" placeholder="Seu e-mail" v-model="email">

      <label for="username">Username:</label>
      <input type="text" name="username" id="username" placeholder="Um nome de usuario" v-model="username">

      <label for="password">Password: </label>
      <input type="password" name="password" id="password" placeholder="Uma senha" v-model="password">
  
      <router-link to="/Login">Fazer login</router-link>
      <button @click="cadastrar()">Cadastrar</button><br>
    </div>
  </section>
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
      errorMsg: ''
    }
  },

  methods: {
    cadastrar() {
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
        if(error.response.status === 400) {
          this.errorMsg = 'Você precisa preencher todos os campos'
        } else if(error.response.status === 409) {
          this.errorMsg = 'Este e-mail já está registrado, tente outro'
        } else {
          console.log(error)
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
  animation: viewError 1s ease-out;
}

@keyframes viewError {
  0%{
    background: #470c8a11;
  }

  100% {
    background: #470c8aff;
  }
}




</style>