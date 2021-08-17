<template>
  <div class="new-comment">
    <div class="profile">
      <img :src="imgProfile | processImg" alt="">
    </div><!-- profile -->

    <div class="comment">
      <textarea type="text" name="comment" id="" v-model="comment"></textarea>
      <button @click="sendComment()">sendComment</button>
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
      var data = {text:this.comment}

      if (this.commentId != "") {
        data.replie = this.commentId
      }

      axios.post(`${hostServer}/post/comment/${this.postId}`,data,  getHeader()).then(res => {
        this.comment = '';
        this.$emit('newComment', res.data.id)
      })
    },
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
}

.comment textarea {
  width: 100%;
  padding:  0rem 10px;
  padding-top: 10px;
  font-size: 1rem;
  height: auto;
  resize:none;
  background: transparent;
  outline: none;
  overflow: hidden;
  border-radius: 20px 0 0 20px;
  border: var(--border);
}

button {
  border-radius: 0px 20px 20px 0;
  background: var(--primary-blue-color);
  padding: 10px 10px;
  border: none;
  font-weight: 700;
  color: var(--primary-text-color);
  cursor: pointer;
  }
</style>