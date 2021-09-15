<template>
  <div class="container">
    <Navbar />
    <section>
      <div class="form form-logged">

        <p>{{msgError}}</p>
        <label for="email">E-mail: </label>
        <div class="input"><input type="email" name="email" id="email" :placeholder="email" v-model="emailInput"></div>

        <label for="name">Nome: </label>
        <div class="input"><input type="name" name="name" id="name" placeholder="Seu nome" v-model="name"></div>

        <label for="username">Nome de usuario</label>
        <div class="input"><input type="text" name="username" id="username" placeholder="Seu nome de usuário" v-model="username"></div>

        <label for="bio">Sua Biografia</label>
        <div class="input"><textarea type="text" name="bio" id="bio" placeholder="Uma bigrafia" v-model="bio"></textarea></div>

        <label for="motivational">Frase</label>
        <div class="input"><textarea type="text" name="motivational" id="motivational" placeholder="Uma frase que te motica" v-model="motivational"></textarea></div>

        <div class="body-image">
          <BasicLoadingImage v-bind:activated="loadingImage"/>
          <img v-if="imgSrc != ''" :src='`${imgSrc}`' alt="">
        </div><!-- body-image -->

        <label class="custom-file-upload">
          <input type="file" name="image" id="image" @change="loadImage()"/>
          <i class="fas fa-image"></i>
        </label><!-- custom-file-upload -->

        <label for="password">Senha: </label>
        <div class="input"><input type="password" name="password" id="password" placeholder="your password" v-model="password"></div>

        <button class="delete-account" @click="showModalDelete()">Deletar Conta</button>
        <button class="" @click="updateItens">Salvar Alteracoes</button>

        <ModalDelete @cancelModel="cancelModel()" @updateModel="updateModel()" :show="showModal"/>
      </div>
    </section>
  </div>
</template>


<script>
import axios from 'axios'
import getHeader from '../getToken';
import Navbar from '../components/Navbar.vue';
import { hostServer } from '../connections';
import BasicLoadingImage from '../components/Loader/BasicLoadingImage.vue';
import ModalDelete from '../components/ModalDelete.vue';
 
export default {
  name: "EditProfile",
  
  data() {
    return {
      imgSrc: '',
      name: '',
      email: '',
      emailInput: '',
      password: '',
      username: '',
      id: '',
      bio: '',
      motivational: '',
      showModal: false,
      hostServer:hostServer,
      loadingImage:false,
      msgError: ''
    }
  },
  components: {
    Navbar,
    ModalDelete,
    BasicLoadingImage
  },
  async created() {
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
    showModalDelete() {
      this.showModal = true
    },

    cancelModel() {
      this.showModal = false
    },
    
    updateModel() {
      axios.delete(`${hostServer}/user/`, getHeader()).then(() => {
        this.$router.push({name: 'Login'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    },

     loadImage() {
        this.loadingImage = true
        let formData = new FormData();
        let image = document.querySelector("#image");

        formData.append("image", image.files[0]);

        let headers  = {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization:getHeader().headers.Authorization
        }
        axios.post(`${hostServer}/userLoadFile`, formData, { headers }, ).then(res => {
          this.imgSrc = res.data.file;
          this.loadingImage = false
        }).catch(() => {
          this.loadingImage = false
        })
    },

    updateItens() {
      axios.put(`${hostServer}/user/${this.id}`, {
        name: this.name,
        email: this.emailInput,
        password: this.password,
        username: this.username,
        bio: this.bio,
        motivational: this.motivational,
        img: this.imgSrc
      }, getHeader()).then(() => {
        this.$router.push({name: 'Profile'})
      }).catch(error => {
        this.msgError = 'Erro ainda em processamento, verifique as informações'
        console.log(`Erro ao registrar dados: ${error}`);
        //console.log(`Erro ao registrar dados: ${error.response}`);
        //console.log(`Erro ao registrar dados: ${error.response.data}`);
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

.delete-account {
  padding: 0;
  background: transparent;
  text-align: left;
  color: var(--primary-text-color);
}

.delete-account:hover {
  background: transparent;
  color: var(--background-body);
}

</style>
