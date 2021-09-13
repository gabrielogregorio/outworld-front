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


<style scoped>
.new-comment {
  display: flex;
  align-content: center;
  width: 100%;
  margin: 10px 0;
}

.profile {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.comment {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
  border: 0;
}

.comment input {
  padding: 2px 10px;
  width: 100%;
  font-size: 1rem;
  resize:none;
  background: transparent;
  outline: none;
  overflow: hidden;
  border-radius: 20px;
  border: var(--border);
}

button {
  padding: 10px 10px;
  border: none;
  cursor: pointer;
  background: transparent;
  }
button i {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-text-color);
}

</style>