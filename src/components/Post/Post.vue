<template>

  <div :class=" !loaded ? 'container-post hidden' : ' container-post'">
    <PostProfile 
      :userId="post.user._id"
      :postId="post._id"
      :createdAt="post.createdAt"
      :updatedAt="post.updatedAt"
      :postName="post.user.name"
      :postUsername="post.user.username"
      :userImg="post.user.img"
      :myId="myId"
      :edited="post.edited"
      @updatePosts="updatePosts()"/>

    <PostBody
      :postImg="postImg"
      :postBody="post.body"
      @loadImageLoading="loadImage()"/>

    <div v-if="post.sharePost != undefined" class="body-border-share"></div>

    <PostProfile  v-if="post.sharePost != undefined"
      :userId="post.sharePost.user._id"
      :postId="post.sharePost._id"
      :postName="post.sharePost.user.name"
      :createdAt="post.createdAt"
      :updatedAt="post.updatedAt"
      :postUsername="post.sharePost.user.username"
      :userImg="post.sharePost.user.img"
      :myId="myId"
      :edited="post.edited"
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
        :class="showComment === true ? 'show-comment' : ''"
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
