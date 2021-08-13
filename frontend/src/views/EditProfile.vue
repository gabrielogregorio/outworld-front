<template>
  <div>
    <Navbar />
    <section>
      <div class="form form-logged">
        <label for="email">E-mail (Não alterável): </label>
        <input type="email" name="email" id="email" placeholder="your email" v-model="email" disabled>

        <label for="name">Nome: </label>
        <input type="name" name="name" id="name" placeholder="Seu nome" v-model="name">

        <label for="username">Nome de usuario</label>
        <input type="text" name="username" id="username" placeholder="Seu nome de usuário" v-model="username">

        <label for="bio">Sua Biografia</label>
        <textarea type="text" name="bio" id="bio" placeholder="Uma bigrafia" v-model="bio"></textarea>

        <label for="motivational">Frase</label>
        <textarea type="text" name="motivational" id="motivational" placeholder="Uma frase que te motica" v-model="motivational"></textarea>

        <label for="image">Sua foto</label>
        <input type="file" name="image" id="image">

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
import { hostServer } from '../connections';

export default {
  name: "EditProfile",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      username: '',
      id: '',
      bio: '',
      motivational: ''
    }
  },
  components: {
    Navbar
  },
  created() {
    axios.get(`${hostServer}/me`, getHeader()).then(res => {
      this.name = res.data[0].name
      this.username = res.data[0].username
      this.email = res.data[0].email
      this.id = res.data[0]._id
      this.bio = res.data[0].bio
      this.motivational = res.data[0].motivational
    }).catch(error => {console.log(error)})
  },
  methods: {
    updateItens() {
      const formData = new FormData();
      const image = document.querySelector("#image");

      formData.append("image", image.files[0]);
      formData.append("name", this.name);
      formData.append("password", this.password);
      formData.append("username", this.username);
      formData.append("bio", this.bio);
      formData.append("motivational", this.motivational);

      var headers  = {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization:getHeader().headers.Authorization
      }

      axios.put(`${hostServer}/user/${this.id}`, formData, { headers }).then(res => {
        console.log(res)
        this.$router.push({name: 'MyProfile'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    } 
  }
}
</script>
