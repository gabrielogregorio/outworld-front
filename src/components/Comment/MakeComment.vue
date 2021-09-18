<template>
  <div class="new-comment">
    <div class="profile">
      <img :src="$filters.processImg(imgProfile)" alt="">
    </div><!-- profile -->

    <div class="comment">
      <input type="text" name="comment" id="" v-model="comment"/>
      <button @click="sendComment()"><i class="far fa-paper-plane"></i></button>
    </div><!-- comment -->
  </div><!-- new-comment -->
</template>

<script>
import axios from 'axios'
import { hostServer } from '../../connections';
import getHeader from '../../getToken';


export default {
  name: 'MakeComment',
  props: {
    imgProfile: String,
    postId: String,
    commentId: String
  },
  data() {
    return {
      comment: '',
      hostServer: hostServer
    }
  },
  methods: {
    sendComment() {
      let data = {text:this.comment}

      if (this.commentId != "") {
        data.replie = this.commentId
      }
      this.comment = '';
      axios.post(`${hostServer}/post/comment/${this.postId}`,data,  getHeader()).then(res => {
        this.$emit('newComment', res.data.id)
      })
    },
  }
}
</script>
