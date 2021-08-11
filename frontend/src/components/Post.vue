<template>
  <div class="container-post">
    <div class="img-post-perfil">
      <img v-if="post.user.img == ''" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${post.user.img}`' alt="">
    </div>

    <div class="info-post">
      <div class="info-post-perfil">
        <div class="info-post-superior">
          <h2>{{post.user.name}}</h2>
          <p class="info-username">{{post.user.username | processUsername}} ·</p>
          <p class="info-time-post">16h</p>
          <div class="delete-post">
            <div v-if="myId == post.user._id">
              <button @click="deletePost(post._id)" ><i class="far fa-trash-alt"></i></button>
              <button @click="editPost(post._id)" ><i class="fas fa-pencil-alt"></i></button>
            </div>
            <div v-else>
              <button></button>
              <button></button>
            </div>
          </div>
        </div>
        <p class="body-post">{{post.body}}</p>

        <div class="body-image">
          <img v-if="post.img != ''" :src='`${hostServer}/images/posts/${post.img}`' alt="">
        </div>

        <div class="options-post">
          <button @click="sendLike(post._id)">Gostei {{post.likes}}</button>
          <button>Comentar (23)</button>
          <button>Retuitar (250)</button>
          <button>Compartilhar (10)</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import getHeader from '../getToken';
import { hostServer } from '../connections';
export default {
  name: 'Post',
  components: {
  },
  data() {
    return {
      hostServer
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
    img: String
  },
  methods: {
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
          axios.get(`${hostServer}/post/${postId}`, getHeader()).then(res2 => {
            this.$emit("updateLikesOnePost", {newLikes: res2.data[0].likes, postId })
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
  }

  .info-post-superior .info-username {
    font-weight: 700;
    margin-left: 5px;
    font-size: 1rem;
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
</style>