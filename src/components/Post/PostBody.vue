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
