<template>
  <div class="container-post">
    <div @click="openProfile(post.user._id)" class="img-post-perfil">
      <img v-if="post.user.img == '' || post.user.img == undefined" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${post.user.img}`' alt="">
    </div><!-- img-post-perfil -->

    <div class="info-post">
      <div class="info-post-perfil">
        <div class="info-post-superior">
          <h2 @click="openProfile(post.user._id)">{{post.user.name}}</h2>
          <p class="info-username" @click="openProfile(post.user._id)">{{post.user.username | processUsername}} ·</p>
          <p class="info-time-post">16h</p>
          <div class="delete-post">
            <div v-if="myId == post.user._id">
              <button @click="deletePost(post._id)" ><i class="far fa-trash-alt"></i></button>
              <button @click="editPost(post._id)" ><i class="fas fa-pencil-alt"></i></button>
            </div>
          </div><!-- delete-post -->
        </div><!-- info-post-superior -->
        <p class="body-post">{{post.body}}</p>

        <div class="body-image">
          <img v-if="post.img != ''" :src='`${hostServer}/images/posts/${post.img}`' alt="">
        </div><!-- body-image -->

        <div class="options-post">
          <button v-if="post.likedByUser == true" class="active-like" @click="sendLike(post._id)">Gostei {{post.likes}} </button>
          <button v-else @click="sendLike(post._id)">Gostei {{post.likes}}</button>

          <button v-if="showComment == true" class="showComment" @click="toogleComment()">Comentar</button>
          <button v-else @click="toogleComment()">Comentar</button>

          <button>Retuitar (250)</button>
          <button>Compartilhar (10)</button>
        </div><!-- options-post -->
      </div>

      <div v-if="showComment">
        <MakeComment :postId="post._id" @newComment="newComment()" :imgProfile="imgProfile"/>
        <div v-for="postComment in post.comments" :key="postComment.id" class="comments">
          <Comment :user="postComment.user" :text="postComment.text" />
        </div><!-- comments -->
      </div>
    </div>
  </div><!-- container-post -->

</template>

<script>
import axios from 'axios';
import getHeader from '../getToken';
import { hostServer } from '../connections';
import Comment from './Comment.vue';
import MakeComment from './MakeComment.vue';

export default {
  name: 'Post',
  components: {
    Comment,
    MakeComment
  },
  data() {
    return {
      hostServer,
      showComment: false
    }
  },
   created() { 
  },  
  filters: {
    processUsername: (value) => {
      if (value == '') {
        return '';
      } else {
        return `@${value}`;
      }
    }
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
    newComment(){
      this.$emit("updatePosts", "")
    },
    deletePost(id) {
      axios.delete(`${hostServer}/post/${id}`, getHeader())
        .then(() => {
          this.$emit("updatePosts", "")
        })
        .catch(error => console.log(error))
    },
    editPost(id) {
      this.$router.push({
        name:"EditPost",
        query: {id}
      })
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
    max-width: 700px;
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    background-color: var(--primary-background);
    border: var(--border);
    border-top: 0;
    padding-bottom: 0;
  }

  .img-post-perfil {
    margin-right: 15px;
    max-width: 50px;
    max-height: 50px;
  }

  .img-post-perfil img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;
  }

  .info-post {
    width: 100%;
  }

  .info-post-perfil {
    width: 100%;
  }

  .info-post-superior {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .info-post-superior h2 {
    font-weight: 700;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  .info-post-superior .info-username {
    font-weight: 700;
    margin-left: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  .delete-post {
    flex: 1;
    text-align: right;
  }

  .delete-post button{
    background-color: transparent;
    outline: none;
    border: 0;
    font-weight: 700;
    cursor: pointer;
    padding: 2px 4px;
  }
  .delete-post button i{
      color: rgb(255, 88, 88);
  }

  .body-post {
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


</style>