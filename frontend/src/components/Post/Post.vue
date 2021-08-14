<template>
  <div class="container-post">

    <PostProfile 
      :userId="post.user._id" :postId="post._id"
      :postName="post.user.name" :postUsername="post.user.username"
      :userImg="post.user.img" :myId="myId"
      @updatePosts="updatePosts()"/>

    <PostBody :postImg="postImg" :postBody="post.body"/>

    <div v-if="post.sharePost != undefined" class="body-border-share"></div>

    <PostProfile  v-if="post.sharePost != undefined"
      :userId="post.sharePost.user._id" :postId="post.sharePost._id"
      :postName="post.sharePost.user.name" :postUsername="post.sharePost.user.username"
      :userImg="post.sharePost.user.img" :myId="myId"
      v-bind:share="true" @updatePosts="updatePosts()"/>

    <PostBody v-if="post.sharePost != undefined"
      :postImg="post.sharePost.img" :postBody="post.sharePost.body" v-bind:share="true"/>

    <div  class="options-post">
      <button v-if="post.likedByUser == true" class="active-like" @click="sendLike(post._id)">Gostei {{post.likes}} </button>
      <button v-else @click="sendLike(post._id)">Gostei {{post.likes}}</button>

      <button v-if="showComment == true" class="showComment" @click="toogleComment()">Comentar</button>
      <button v-else @click="toogleComment()">Comentar</button>

      <button>Salvar</button>
      <button v-if="post.sharePost != undefined" @click="sharePostNow(post.sharePost._id)">Compartilhar </button>
      <button v-else @click="sharePostNow(post._id)">Compartilhar </button>
    </div><!-- options-post -->

    <div v-if="showComment">
      <MakeComment :postId="post._id" @newComment="newComment()" :imgProfile="imgProfile"/>
      <div v-for="postComment in post.comments" :key="postComment.id" class="comments">
        <Comment :user="postComment.user" :text="postComment.text" />
      </div><!-- comments -->
    </div>

  </div><!-- container-post -->
</template>

<script>
import axios from 'axios';
import getHeader from '../../getToken';
import { hostServer } from '../../connections';
import Comment from '../Comment.vue';
import MakeComment from '../MakeComment.vue';
import PostProfile from './PostProfile.vue';
import PostBody from './PostBody.vue';

export default {
  name: 'Post',
  components: {
    Comment,
    MakeComment,
    PostProfile,
    PostBody
  },
  data() {
    return {
      hostServer:hostServer,
      showComment: false,
      postShared: false,
      postImg: this.post.img
    }
  },

   created() {       
  },  
  props: {
    post: Object,
    myId: String,
    img: String,
    imgProfile: String
  },
  methods: {
    toogleComment() {
      this.showComment = !this.showComment
    },
    openProfile(id){
      this.$router.push({
        name:"ProfileUser",
        query: {id}
      })    
    },
    updatePosts() {
      this.$emit("updatePosts", "")
    },
    sharePostNow(id) {
      axios.post(`${hostServer}/post/share/${id}`, {}, getHeader()).then(() => {
        this.$emit("updatePosts", "")
      })

    },
    newComment(){
      this.$emit("updatePosts", "")
    },
    sendLike(postId) {
       axios.post(`${hostServer}/post/like/${postId}`, {}, getHeader())
        .then(() => {
          axios.get(`${hostServer}/post/${postId}`, getHeader()).then(() => {
            this.$emit("updatePosts", "")
          })
        })
    }
  }
}
</script>

<style scoped>
div.container-post {
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
  padding-bottom: 0;
}

.options-post {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
}

.options-post button {
  background-color: transparent;
  outline: none;
  border: 0;
  padding: 5px 10px;
  cursor: pointer;
  color: rgb(133, 133, 133);
  cursor: pointer;
}

.options-post .active-like {
  display: block;
  background: var(--primary-blue-color);
  color: white;
  border-radius: 10px;
}

.options-post .showComment {
  display: block;
  background: var(--primary-purple-color);
  color: white;
  border-radius: 10px;
}
.body-border-share {
  border-top: var(--border);
  width: 100%;
  padding-bottom: 20px;
}
</style>