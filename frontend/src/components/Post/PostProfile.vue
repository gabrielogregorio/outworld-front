<template>
  <div :class="share != true ? 'row-info-profile' : 'row-info-profile body-padding'">

    <router-link :to="{ path: 'ProfileUser', query: { id: userId }}" class="img-post-perfil">
      <img v-if="userImg == '' || userImg == undefined" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${userImg}`' alt="">
   </router-link>

    <div class="info-post-superior">
      <router-link :to="{ path: 'ProfileUser', query: { id: userId }}">{{postName}}</router-link>
      <router-link :to="{ path: 'ProfileUser', query: { id: userId }}">{{postUsername | processUsername}} ·</router-link>
      <p>16h</p>
      <div class="delete-post">
        <div v-if="myId == userId">
          <button @click="deletePost(postId)" ><i class="far fa-trash-alt"></i></button>
          <router-link :to="{ path: 'EditPost', query: { id: postId }}"><i class="fas fa-pencil-alt"></i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getHeader from '../../getToken';
import { hostServer } from '../../connections';
import axios from 'axios'

export default {
  name: 'PostProfile',
  data() {
    return {
      hostServer:hostServer
    }
  },
  props: {
    userId: String,
    postId: String,
    userImg: String,
    postName: String,
    postUsername: String,
    myId: String,
    share: Boolean
  },
  methods: {
    deletePost(id) {
      axios.delete(`${hostServer}/post/${id}`, getHeader())
        .then(() => {
          this.$emit("updatePosts", "")
        }).catch(error => console.log(error))
    }
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
}
</script>


<style scoped>
.row-info-profile {
  width: 100%;
  display: flex;
}

.img-post-perfil {
  margin-right: 15px;
}

.img-post-perfil img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
}

.info-post-superior {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.info-post-superior a:nth-child(1) {
  font-weight: 700;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
.info-post-superior a:nth-child(2) {
  font-weight: 700;
  margin-left: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.delete-post {
  flex: 1;
  text-align: right;
}
.delete-post button, .delete-post a{
  background-color: transparent;
  outline: none;
  border: 0;
  font-weight: 700;
  cursor: pointer;
  padding: 2px 4px;
}
.delete-post button i, .delete-post a i{
  color: rgb(255, 88, 88);
}

.body-padding {
  padding-left: 50px;
} 

</style>
