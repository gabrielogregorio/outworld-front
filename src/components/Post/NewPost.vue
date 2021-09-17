<template> 
  <section>
    <div class="container-post">
      <div class="img-post-perfil">
        <img :src="$filters.processImg(img)" alt="">
      </div><!-- img-post-perfil -->

      <div class="info-post">
        <div class="info-post-perfil">
          <textarea class="body-post" name="body" v-model="body" id="bod" cols="15" rows="2" placeholder="Hoje eu ..."></textarea>
          <div class="body-image">
            <BasicLoadingImage v-bind:activated="loadingImage"/>
            <img v-if="imgSrc !== '' && imgSrc !== undefined" :src='`${imgSrc}`' alt="">
          </div><!-- body-image -->

          <div class="botao-postar">
            <label class="custom-file-upload">
              <input type="file" name="image" id="image" @change="loadImage()"/>
              <i class="fas fa-image"></i>
            </label><!-- custom-file-upload -->
            <button class="button-default active-button-default" @click="createPost">Comentar</button>
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
import BasicLoadingImage from '../Loader/BasicLoadingImage.vue';


export default {
  name: 'NewPost',
  components: {
    BasicLoadingImage
  },
  data() {
    return {
      body: '',
      imgSrc: '',
      hostServer,
      loadingImage: false
    }
  },
  props: {
    img: String
  },
  create() {},
  methods: {
    loadImage() {
      this.loadingImage = true
      let formData = new FormData();
      let image = document.querySelector("#image");

      formData.append("image", image.files[0]);

      let headers  = {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization:getHeader().headers.Authorization
      }
      axios.post(`${hostServer}/postLoadFile`, formData, { headers }, ).then(res => {
        this.imgSrc = res.data.file;
        this.loadingImage = false
      }).catch(() => {
        this.loadingImage = false
      })
    },
    createPost() {
      if ( this.body == '' || this.body == undefined) {
        return;
      }
      axios.post(`${hostServer}/post`, { img: this.imgSrc, body: this.body}, getHeader(), ).then(() => {
        this.$emit("updatePosts", "");
        this.body = ''
        this.imgSrc = ''
        this.loadingImage = false

      }).catch(error => {
        console.log(`Erro ao registrar dados: ${error}`);
        this.loadingImage = false
      })
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
  background-color: var(--background-2);
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
  color: var(--color-4);
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
  color: var(--color-4);
  font-weight: 400;
  width: 100%;
  font-size: 20px;
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
  color: var(--color-4);
}

textarea::placeholder{
  color: var(--color-5);
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