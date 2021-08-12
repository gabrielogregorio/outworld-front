<template>
<div>
  <Navbar />
  <section>
    <div class="form">
      <label for="body">Seu post</label>
      <textarea name="body" v-model="body" id="body" cols="15" rows="2" placeholder="O que você quer polemizar?"></textarea>
      <img v-if="imgSrc != '' || imgSrc == undefined" :src='`http://127.0.0.1:3333/images/posts/${imgSrc}`' alt="">

      <label class="custom-file-upload">
        <input type="file" name="image" id="image" @change="loadImage()"/>
        <i class="fas fa-image"></i>
      </label>

      <button class="red" @click="updateItens">Salvar post</button>
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
  name: "EditPost",
  data() {
    return {
      body: '',
      img: '',
      imgSrc: '',
      user: ''
    }
  },
  components: {
    Navbar
  },
  created() {
    axios.get(`${hostServer}/post/${this.$route.query.id}`, getHeader()).then(res => {
      this.body = res.data[0].body
      this.img = res.data[0].img
      this.user = res.data[0]._id
      this.imgSrc = this.img
    }).catch(error => {console.log(error)})
  },
  methods: {
        loadImage() {
      console.log('Escolheu umagem!')
  
      const formData = new FormData();
      const image = document.querySelector("#image");

      formData.append("image", image.files[0]);

      var headers  = {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization:getHeader().headers.Authorization
      }
      axios.post(`${hostServer}/postLoadFile`, formData, { headers }, ).then(res => {
        this.imgSrc = res.data.file;
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    },
    updateItens() {

      axios.put(`${hostServer}/post/${this.$route.query.id}`, {
         img: this.imgSrc,
         title: 'titulo qualquer',
         user: this.user,
         body: this.body
      }, getHeader()).then(res => {
        console.log(res)
        this.$router.push({name: 'Home'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    } 
  }
}
</script>
