<template> 
  <div>
    <Navbar /> 
    <NewPost @updatePostsEvent="updatePosts()" :img="img" />

    <div class="container-post" v-for="post in posts" :key="post._id">
      <Post v-bind:post="post" v-bind:myId="myId" v-bind:imgProfile="img" @updatePosts="updatePosts()" />      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import getHeader from '../getToken';
import NewPost from '../components/NewPost.vue';
import Navbar from '../components/Navbar.vue';
import Post from '../components/Post/Post.vue';
import { hostServer } from '../connections';

export default {
  name: 'Home',
  components: {
    NewPost,
    Post,
    Navbar
  },
  data() {
    return {
      posts: [],
      myId: '',
      img: ''
    }
  },
  async created() {
    let me = await axios.get(`${hostServer}/me`, getHeader())
    this.myId = me.data[0]._id;
    this.img = me.data[0].img;
    this.posts = []

    let posts = await axios.get(`${hostServer}/posts`, getHeader())
    for (let i=0; i<posts.data.length; i++) {
          
      if (posts.data[i].sharePost != undefined) {
        var data = await axios.get(`${hostServer}/post/${posts.data[i].sharePost}`, getHeader())
        posts.data[i].sharePost = data.data[0]
      }
      this.posts.push(posts.data[i])
    }
  },  
  methods: {
    async updatePosts() {
      let novosPosts = []
      let posts = await axios.get(`${hostServer}/posts`, getHeader())
      for (let i=0; i<posts.data.length; i++) {
          
        if (posts.data[i].sharePost != undefined) {
          var data = await axios.get(`${hostServer}/post/${posts.data[i].sharePost}`, getHeader())
          posts.data[i].sharePost = data.data[0]
        }
        novosPosts.push(posts.data[i])
      }
      this.posts = novosPosts;
    }
  }
}
</script>


<style scoped>
</style>