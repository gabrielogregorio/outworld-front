<template>
  <div :class="share != true ? 'body-post' : 'body-post body-padding'">
    <p class="content-post">{{postBody}}</p>
    <div class="body-image">
      <img v-if="postImg != '' && postImg != undefined" :src='`${hostServer}/images/posts/${postImg}`' alt="">
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
  }
}
</script>


<style scoped>


.content-post {
  color: rgb(192, 192, 192);
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
</style>
