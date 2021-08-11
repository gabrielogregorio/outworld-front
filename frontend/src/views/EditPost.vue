<template>
<div>
  <Navbar />
  <section>
    <div class="form">
      <textarea name="body" v-model="body" id="bod" cols="15" rows="2" placeholder="O que você quer polemizar?"></textarea>
      <img v-if="img != ''" :src='`http://127.0.0.1:3333/images/posts/${img}`' alt="">
      <input type="file" name="image" id="image">

      <button class="red" @click="updateItens">Salvar post</button>
    </div>
    
  </section>

</div>
</template>

<script>
import axios from 'axios'
import getHeader from '../getToken';
import Navbar from '../components/Navbar.vue';

export default {
  name: "EditPost",
  data() {
    return {
      body: '',
      img: '',
      id: ''
    }
  },
  components: {
    Navbar
  },
  created() {
    axios.get(`http://localhost:3333/post/${this.$route.query.id}`, getHeader()).then(res => {
      this.body = res.data[0].body
      this.img = res.data[0].img
      this.id = res.data[0]._id
    }).catch(error => {console.log(error)})
  },
  methods: {
    updateItens() {
      const formData = new FormData();
      const image = document.querySelector("#image");

      console.log(this.id, this.body)

      formData.append("image", image.files[0]);
      formData.append("title",  'titulo');
      formData.append("id",  this.id);
      formData.append("body", this.body);

      var headers  = {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization:getHeader().headers.Authorization
      }
      axios.put(`http://localhost:3333/post/${this.id}`, formData, { headers }).then(res => {
      console.log(res)
      this.$router.push({name: 'Home'})
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    } 
  }
}
</script>
