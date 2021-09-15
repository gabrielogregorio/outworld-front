<template>

  <div :class=" !loaded ? 'container-post hidden' : ' container-post'">
    <PostProfile 
      :userId="post.user._id" :postId="post._id"
      :postName="post.user.name" :postUsername="post.user.username"
      :userImg="post.user.img" :myId="myId"
      @updatePosts="updatePosts()"/>

    <PostBody
      :postImg="postImg"
      :postBody="post.body"
      @loadImageLoading="loadImage()"/>

    <div v-if="post.sharePost != undefined" class="body-border-share"></div>

    <PostProfile  v-if="post.sharePost != undefined"
      :userId="post.sharePost.user._id" :postId="post.sharePost._id"
      :postName="post.sharePost.user.name" :postUsername="post.sharePost.user.username"
      :userImg="post.sharePost.user.img" :myId="myId"
      v-bind:share="true" @updatePosts="updatePosts()"/>
 
    <PostBody v-if="post.sharePost != undefined"
      :postImg="post.sharePost.img"
      :postBody="post.sharePost.body"
      v-bind:share="true"
      @loadImageLoading="loadImage()"/>
 
    <div class="options-post">
      <button
        :class="likedByUser === true ? 'active-like': ''"
        @click="sendLike(post._id)">
          <i class="fas fa-thumbs-up"></i>
          {{post.likes !== 0 ? post.likes : null }}
      </button>

      <button
        :class="showComment === true ? 'showComment' : ''"
        @click="toogleComment()">
          <i class="fas fa-comment-dots"></i>
          {{countComments !== 0 ? countComments : null }}
      </button>

      <button
        :class="savedByUser === true ? 'active-share' : ''"
        @click="sendSave(post._id)">
          <i class="fas fa-archive" aria-hidden="true"></i>
      </button>

      <button
        v-if="post.sharePost !== undefined"
        @click="sharePostNow(post.sharePost._id)">
          <i class="fas fa-share-alt"></i>
      </button>
      
      <button
        v-else
        @click="sharePostNow(post._id)">
          <i class="fas fa-share-alt"></i>
      </button>
    </div><!-- options-post -->

    <div v-if="showComment">
      <MakeComment
        commentId=""
        :postId="post._id"
        @newComment="newComment()"
        :imgProfile="imgProfile"/>
 
      <div v-for="postComment in post.comments" :key="postComment._id" class="comments"> 
        <Comment
          :postComment="postComment"
          @newComment="newComment()"
          :user="postComment.user"
          :myId="myId"
          v-bind:text="postComment.text"
          v-bind:postId="post._id"
          v-bind:commentId="postComment._id"
          :imgProfile="imgProfile"/>
      </div><!-- comments -->
    </div>
  </div><!-- container-post -->
</template>

<script>
import axios from 'axios';
import getHeader from '../../getToken';
import { hostServer } from '../../connections';
import Comment from '../Comment/Comment.vue';
import MakeComment from '../Comment/MakeComment.vue';
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
      loaded: false,
      hostServer:hostServer,
      showComment: false,
      postShared: false,
      postImg: this.post.img,
      likedByUser: false,
      savedByUser: false,
      countComments: 0
    }
  },

  props: {
    post: Object,
    myId: String,
    img: String,
    imgProfile: String
  },

  created() {   
    this.likedByUser = this.post.likedByUser
    this.savedByUser = this.post.savedByUser
    this.countComments = this.counterBase(this.post.comments)
  },  

  methods: {
    /* Funções recursivas que fiz para contar os posts*/
    counterDeepth(comments, counter=0) {
      if(comments === undefined || comments?.['replies'] === undefined) {
        return counter
      }
      counter = counter + 1

      for(let i = 0; i < comments['replies'].length; i++) {
        counter = this.counterDeepth(comments['replies'][i], counter)
      }

      return counter  
    },

    counterBase(post_comments) {
      let counter = 0;

      for(let i = 0; i < post_comments.length; i++) {
        counter = this.counterDeepth(post_comments[i], counter)
      }
      return counter
    },

    loadImage() {
      this.loaded = true
    },

    toogleComment() {
      this.showComment = !this.showComment
    },

    openProfile(id){
      this.$router.push({
        name:"Profile",
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

    sendSave(postId) {
      this.savedByUser = !this.savedByUser
      axios.post(`${hostServer}/post/save/${postId}`, {}, getHeader()).then(() => {
        this.$emit("updatePosts", "")
      })
    },

    sendLike(postId) {
      this.likedByUser = !this.likedByUser
      axios.post(`${hostServer}/post/like/${postId}`, {}, getHeader()).then(() => {
        this.$emit("updatePosts", "")
      })
    }
  }
}
</script>

<style scoped>

div.container-post {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  padding: 10px 30px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
  padding-bottom: 0;
}

div.hidden {
  display: none;
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
  padding: 10px 15px;
  cursor: pointer;
  color: var(--primary-text-color);
  cursor: pointer;
}

.options-post .active-like {
  display: block;
  border-radius: 10px;
  color: var(--color-highlight-icones);
}

.options-post button > i{
    font-size: 1.2rem;
}

.options-post button.active-like  > i{
  color: var(--color-highlight-icones);
}

.options-post .showComment {
  display: block;
  border-radius: 10px;
}

.options-post .showComment > i{
  color: var(--color-highlight-icones);
}
 
.options-post button.active-share {
  display: block;
  border-radius: 10px;
}

.options-post button.active-share > i{
  color: var(--color-highlight-icones);
}

.body-border-share {
  border-top: 1px solid var(--border-color-opacity);
  width: 100%;
  padding-bottom: 20px;
}

@media screen and (max-width: 600px){
 div.container-post {
   padding: 0;
 }
}
</style>