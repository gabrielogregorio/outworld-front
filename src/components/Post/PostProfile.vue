<template>
  <div :class="share != true ? 'row-info-profile' : 'row-info-profile body-padding'">
    <router-link :to="{ path: 'Profile', query: { id: userId }}" class="img-post-perfil">
      <img :src="$filters.processImg(userImg)" alt="">
    </router-link>

    <div class="info-post-superior">
      <div class="info-post-superior-base">
        <router-link :to="{ path: 'Profile', query: { id: userId }}">{{postName}}</router-link>
        <div class="config-post">
          <div v-if="myId === userId">
            <DropDown @editPostRedirect="editPostRedirect()" @deletePost="deletePost()" />
          </div>
        </div>
      </div>

      <div class="info-post-superior-baixo">
        <p>{{ $filters.processDate(createdAt)}}</p>
        <pre>{{ $filters.processEdited(edited)}}</pre>
      </div>
    </div>





  </div>
</template>

<script>
import getHeader from '../../getToken';
import { hostServer } from '../../connections';
import axios from 'axios'
import DropDown from '../dropdow/DropDown.vue';

export default {
  name: 'PostProfile',
  data() {
    return {
      hostServer:hostServer
    }
  },
  components: {
    DropDown
  },
  created() {
    console.log(this.createdAt, 11)
  },
  props: {
    userId: String,
    postId: String,
    userImg: String,
    postName: String,
    postUsername: String,
    myId: String,
    share: Boolean,
    createdAt: String,
    updatedAt: String,
    edited: Boolean
  },
  methods: {
    editPostRedirect() {
      console.log(this.postId)
      this.$router.push({name: 'EditPost', query: { id: this.postId }})
    },

    deletePost() { 
      console.log(this.postId)
      axios.delete(`${hostServer}/post/${this.postId}`, getHeader())
        .then(() => {
           this.$emit("updatePosts", "")
        }).catch(error => console.log(error))
    }
  }
}
</script>


<style scoped>

.row-info-profile {
  padding: 2%;
  width: 100%;
  display: flex;
}

.img-post-perfil {
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-post-perfil img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
}

.info-post-superior {
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
}

.info-post-superior-base {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
}

.info-post-superior-base a {
  font-size: 16px;
  text-decoration: none;
  flex: 1;
}

.info-post-superior-base a:nth-child(1) {
  font-weight: 700;
  color: var(--color-4);
  font-size: 1rem;
  cursor: pointer;
}

.info-post-superior-base a:nth-child(2) {
  font-weight: 700;
  margin-left: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.info-post-superior-baixo {
  display: flex;
  width: 100%;
}

.info-post-superior-baixo  a {
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;  
}

.info-post-superior-baixo p, .info-post-superior-baixo pre {
  font-size: 0.8rem;
}

.config-post {
}

.body-padding {
  padding-left: 50px;
} 

@media screen and (max-width: 600px){
}
</style>
