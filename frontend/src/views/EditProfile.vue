<template>
<div>
  <Navbar />
  <section>
    <div class="form">
      <label for="name">Nome: </label>
      <input type="name" name="name" id="name" placeholder="Seu nome" v-model="name">

      <label for="email">E-mail: </label>
      <input type="email" name="email" id="email" placeholder="your email" v-model="email" disabled>

      <label for="password">Senha: </label>
      <input type="password" name="password" id="password" placeholder="your password" v-model="password">

      <button class="red" @click="updateItens">Salvar Alteracoes</button>
    </div>
    
  </section>

</div>
</template>

<script>
import axios from 'axios'
import getHeader from '../getToken';
import Navbar from '../components/Navbar.vue';

export default {
  name: "EditProfile",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      id: ''
    }
  },
  components: {
    Navbar
  },
  created() {
    axios.get('http://localhost:3333/me', getHeader()).then(res => {
      this.name = res.data[0].name
      this.email = res.data[0].email
      this.id = res.data[0]._id
    }).catch(error => {console.log(error)})
  },
  methods: {
    updateItens() {
      axios.put(`http://localhost:3333/user/${this.id}`, {
        name: this.name,
        password: this.password
      }, getHeader()).then(res => {
        console.log(res)
        this.$router.push({name: 'Home'})
      }).catch(error => console.log(error))
    }
  }
}
</script>
