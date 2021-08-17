<template> 
  <section>
    <div class="container-post">
      <div class="img-post-perfil">
        <img :src="img | processImg" alt="">
      </div><!-- img-post-perfil -->

      <div class="info-post">
        <div class="info-post-perfil">
          <textarea class="body-post" name="body" v-model="body" id="bod" cols="15" rows="2" placeholder="Sobre o que você quer conversar?"></textarea>
          <div class="body-image">
            <img v-if="imgSrc != ''" :src='`${hostServer}/images/posts/${imgSrc}`' alt="">
          </div><!-- body-image -->

          <div class="botao-postar">
            <label class="custom-file-upload">
              <input type="file" name="image" id="image" @change="loadImage()"/>
              <i class="fas fa-image"></i>
            </label><!-- custom-file-upload -->
            <button class="buttonDefault activeButtonDefault" @click="createPost">Comentar</button>
          </div><!-- botao-postar -->
        </div><!-- info-post-perfil -->
      </div><!-- info-post -->
    </div><!-- container-post -->
    <div class="border-post-space"></div>
  </section>
</template>

<script>
import axios from 'axios'
import getHeader from '../../getToken';
import { hostServer } from '../../connections';


export default {
  name: 'NewPost',
  data() {
    return {
      body: '',
      imgSrc: '',
      hostServer
    }
  },
  props: {
    img: String
  },
  create() {},
  methods: {
    loadImage() {
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
    createPost() {
      if ( this.body == '' || this.body == undefined) {
        return;
      }
      axios.post(`${hostServer}/post`, { img: this.imgSrc, body: this.body}, getHeader(), ).then(() => {
        this.$emit("updatePostsEvent", "");
        this.body = ''
        this.imgSrc = ''

      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
      })
    }
  },
  filters: {
    processImg: (value) => {
      if(value == '' || value == undefined) {
        return "/user.webp"
      }
      return `${hostServer}/images/clients/${value}`
    }
  }
}
</script>


<style scoped>
div.container-post {
  display: flex;
  max-width: 900px;
  width: 100%;
  padding: 10px 30px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
  padding-bottom: 0;
}

.img-post-perfil {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.img-post-perfil img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.info-post {
  width: 100%;
}

.info-post-perfil {
  width: 100%;
}

.info-post-superior {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.info-post-superior h2 {
  font-weight: 700;
  color: var(--primary-text-color);
  font-size: 1rem;
}

.info-post-superior .info-username {
  font-weight: 700;
  margin-left: 5px;
  font-size: 1rem;
}

.delete-post {
  flex: 1;
  text-align: right;
}

.body-post {
  color: var(--primary-text-color);
  font-weight: 400;
  width: 100%;
}

.body-image {
  padding: 10px 0;
}

.body-image > img{
  width: 100%;
  border: var(--border);
  border-radius: 20px;
  max-height: 900px;
  object-fit: cover;
  cursor: pointer;
}

.botao-postar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

textarea {
  width: 100%;
  background: transparent;
  outline: none;
  border: none;
  resize: none;
  overflow-y: hidden;
  font-size: 1.4rem;
  color: var(--primary-text-color);
}

textarea::placeholder{
  color: var(--secundary-text-color);
}


@media screen and (max-width: 600px){
 div.container-post {
   padding: 2%;
 }

 .botao-postar i{
   font-size: 1.8rem;
 }
}
</style>