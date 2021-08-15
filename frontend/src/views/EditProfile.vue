<template>
  <div class="container">
    <Navbar />
    <section>
      <div class="form form-logged">
        <label for="email">E-mail (Não alterável): </label>
        <div class="input"><input type="email" name="email" id="email" placeholder="your email" v-model="email" disabled></div>

        <label for="name">Nome: </label>
        <div class="input"><input type="name" name="name" id="name" placeholder="Seu nome" v-model="name"></div>

        <label for="username">Nome de usuario</label>
        <div class="input"><input type="text" name="username" id="username" placeholder="Seu nome de usuário" v-model="username"></div>

        <label for="bio">Sua Biografia</label>
        <div class="input"><textarea type="text" name="bio" id="bio" placeholder="Uma bigrafia" v-model="bio"></textarea></div>

        <label for="motivational">Frase</label>
        <div class="input"><textarea type="text" name="motivational" id="motivational" placeholder="Uma frase que te motica" v-model="motivational"></textarea></div>

        <div class="body-image">
        <img v-if="imgSrc != ''" :src='`${hostServer}/images/clients/${imgSrc}`' alt="">
        </div><!-- body-image -->

        <label class="custom-file-upload">
          <input type="file" name="image" id="image" @change="loadImage()"/>
          <i class="fas fa-image"></i>
        </label><!-- custom-file-upload -->

        <label for="password">Senha: </label>
        <div class="input"><input type="password" name="password" id="password" placeholder="your password" v-model="password"></div>

        <button @click="updateItens">Salvar Alteracoes</button>
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
      imgSrc: '',
      name: '',
      email: '',
      password: '',
      username: '',
      id: '',
      bio: '',
      motivational: '',
      hostServer:hostServer
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
      this.imgSrc = res.data[0].img
      this.motivational = res.data[0].motivational
      
    }).catch(error => {console.log(error)})
  },
  methods: {
     loadImage() {
      const formData = new FormData();
      const image = document.querySelector("#image");

      formData.append("image", image.files[0]);

      var headers  = {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization:getHeader().headers.Authorization
      }
      axios.post(`${hostServer}/userLoadFile`, formData, { headers }, ).then(res => {
        this.imgSrc = res.data.file;
        console.log('img atualizada!', this.imgSrc)
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    },

    updateItens() {
      axios.put(`${hostServer}/user/${this.id}`, {
        name: this.name,
        password: this.password,
        username: this.username,
        bio: this.bio,
        motivational: this.motivational,
        img: this.imgSrc
      }, getHeader()).then(res => {
        console.log(res)
        this.$router.push({name: 'MyProfile'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    } 
  }
}
</script>

<style scoped>
.body-image {
  padding: 10px;
}

.body-image > img{
  width: 100%;
  border: var(--border);
  border-radius: 20px;
  max-height: 900px;
  object-fit: cover;
  cursor: pointer;
}


</style>
