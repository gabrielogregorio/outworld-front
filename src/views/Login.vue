<template>
<div class="login-cadastro">
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


<style scoped>

span {
  margin-top: 10px;
  padding: 10px;
  background: var(--background-1);
  color:var(--color-4);
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
  border-top: 5px solid var(--background-1);
  border-left: 5px solid var(--background-1);
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