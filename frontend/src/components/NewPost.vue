<template> 
  <section>
    <div class="container-new-post">
      <div class="conteudo-novo-post">
        <div class="novo-post-imagem-perfil">
          <img v-if="img == ''" src="/user.webp" alt="">
          <img v-else :src='`http://127.0.0.1:3333/images/clients/${img}`' alt="">
        </div>

        <textarea name="body" v-model="body" id="bod" cols="15" rows="2" placeholder="O que você quer polemizar?"></textarea>
      </div>
    <div class="botao-postar">
      <input type="file" name="image" id="image">
      <button @click="createPost">Tweetar</button>
    </div>
  </div>
  <div class="border-post-space"></div>
  </section>
</template>

<script>
import axios from 'axios'
import getHeader from '../getToken';

export default {
  name: 'NewPost',
  data() {
    return {
      title: 'aaaa',
      body: ''
    }
  },
  props: {
    img: String
  },
  create() {
  },
  methods: {
    createPost() {
      if (this.title == '' || this.body == '' || this.title == undefined || this.body == undefined) {
        return;
      }

      //Form data para enviar o arquivo
      const formData = new FormData();
      const image = document.querySelector("#image");

      formData.append("image", image.files[0]);
      formData.append("title", this.title);
      formData.append("body", this.body);

      console.log(getHeader().headers)

      var headers  = {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization:getHeader().headers.Authorization
      }
      axios.post("http://localhost:3333/post", formData, { headers }, ).then(() => {
        this.$emit("updatePostsEvent", "");
        this.body = ''
      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    }
  }
}
</script>


<style scoped>



  .conteudo-novo-post {
    display: flex;
  }

  
div.container-new-post {
  max-width: 700px;
  width: 100%;
  padding: 40px 20px;
  margin: 0 auto;
  background-color: black;
  border: 1px solid #555;
}

div.border-post-space {
  max-width: 700px;
  margin: 0 auto;
  background-color: rgb(58, 58, 58);
  border: 1px solid #555;
  padding: 10px 0;
  width: 100%;
  border-top: 0;
  border-bottom: 0;
}

  .novo-post-imagem-perfil {
    max-width: 50px;
    max-height: 50px;
    margin-right: 10px;
  }
  .novo-post-imagem-perfil img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .conteudo-novo-post textarea {
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    resize: none;
    overflow-y: hidden;
    font-size: 1.4rem;
    color: #ddd;
  }

  .botao-postar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .botao-postar button {
    border-radius: 20px;
    background: rgb(27, 121, 197);
    padding: 10px 20px;
    border: none;
    font-weight: 700;
    color: #ddd;
    cursor: pointer;
  }

</style>