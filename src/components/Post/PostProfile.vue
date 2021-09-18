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
      this.$router.push({name: 'EditPost', query: { id: this.postId }})
    },

    deletePost() { 
      axios.delete(`${hostServer}/post/${this.postId}`, getHeader())
        .then(() => {
           this.$emit("updatePosts", "")
        }).catch(error => console.log(error))
    }
  }
}
</script>
