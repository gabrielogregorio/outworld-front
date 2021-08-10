<template>
  <div class="container-post">
    <div class="img-post-perfil">
      <img src="/user.webp" alt="">
    </div>

    <div class="info-post">
      <div class="info-post-perfil">
        <div class="info-post-superior">
          <h2>{{post.user.name}}</h2>
          <p class="info-username">@user ·</p>
          <p class="info-time-post">16h</p>
          <div class="delete-post">
            <button v-if="myId == post.user._id" @click="deletePost(post._id)" >X</button>
            <button v-else ></button>
          </div>
        </div>
        <p class="body-post">{{post.body}}</p>

        <div class="options-post">
          <button>Comentar (23)</button>
          <button>Retuitar (250)</button>
          <button>Gostei (920)</button>
          <button>Compartilhar (10)</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import getHeader from '../getToken';

export default {
  name: 'Post',
  components: {
  },
  data() {
    return {
    }
  },
   created() {
  },  
  props: {
    post: Object,
    myId: String
  },
  methods: {
    deletePost(id) {
      axios.delete(`http://localhost:3333/post/${id}`, getHeader())
        .then(() => {
          this.$emit("updatePosts", "")
        })
        .catch(error => console.log(error))
    }
  },
 
}
</script>

<style scoped>

div.container-post {
  display: flex;
  max-width: 700px;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  background-color: black;
  border: 1px solid #555;
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
    color: rgb(255, 88, 88);
  border: 0;
  font-weight: 700;
  cursor: pointer;
}

.body-post {
  color: rgb(192, 192, 192);
  font-weight: 400;
  width: 100%;
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