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
