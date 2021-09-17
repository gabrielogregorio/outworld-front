<template>
  <div :class="share != true ? 'body-post' : 'body-post body-padding'">
    <p class="content-post">{{postBody}}</p>
    <div class="body-image">
      <img
        v-if="postImg != '' && postImg != undefined"
        :src='`${postImg}`'
        alt=""
        @load="loadImage()">
    </div>
  </div> 
</template>

<script>
import { hostServer } from '../../connections';

export default {
  name: 'PostBody',
  data() {
    return {
      hostServer:hostServer
    }
  },
  props: {
   postImg: String, 
   postBody: String,
   share: Boolean
  },
  methods: {
    loadImage() {
      this.$emit('loadImageLoading', "")
    }
  },
  created() {
    if(this.postImg  === ''|| this.postImg === undefined ) {
      this.loadImage()
    }
  }
}
</script>


<style scoped>
.content-post {
  padding: 2%;
  color: var(--color-4);
  font-weight: 400;
  width: 100%;
}

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

.body-padding {
  padding-left: 50px;
}


@media screen and (max-width: 600px){
.body-image > img{
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  border: 0;
}

.body-image {
  padding-left: 0;
  padding-right: 0;
  height: 100%;
  max-height: 100vh;
}
}
</style>
