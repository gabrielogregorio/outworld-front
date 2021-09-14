<template>
  <section>
   <div v-if="activated === true"  class="form container">
     <h1>Criando a conta</h1>
     <div class="loading-posts">
       <div></div>
     </div>
   </div>


   <div v-if="activated === false"  class="form container">
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
  background: var(--border-color);
  color:var(--primary-text-color);
  border-radius: 5px;
  text-align: center;
}

.loading-posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  min-height: 50px;
  margin: 0;
  border: 0;
  padding: 10px 0; 
}
 
.loading-posts div {
  border: 5px solid transparent;
  border-top: 5px solid var(--background-body);
  border-left: 5px solid var(--background-body);
  height: 50px;
  width: 50px;
  border-radius: 50%;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>