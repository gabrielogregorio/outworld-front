<template> 
  <div class="container">
    <Navbar /> 
    <NewPost @updatePostsEvent="updatePosts()" :img="img" />
    <div v-for="(post, index) in posts" :key="post._id + index">
      <Post v-bind:post="post" v-bind:myId="myId" v-bind:imgProfile="img" @updatePosts="updatePosts()" />      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import getHeader from '../getToken';
import NewPost from '../components/Post/NewPost.vue';
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
  beforeRouteUpdate(to, from, next) {
    //to
    //to.query.archive == true
    next();
    this.updatePosts()

  },
  async created() {
    let me = await axios.get(`${hostServer}/me`, getHeader())
    this.myId = me.data[0]._id;
    this.img = me.data[0].img;
    this.posts = []

    var rota = '/posts';
    if (this.$route.query.archive == 'true') { rota = '/post/list/save/' }
    let posts = await axios.get(`${hostServer}${rota}`, getHeader())
    for (let i=0; i<posts.data.length; i++) {
          
      if (posts.data[i].sharePost != undefined) {
        try {
          var data = await axios.get(`${hostServer}/post/${posts.data[i].sharePost}`, getHeader())
          posts.data[i].sharePost = data.data[0]
        } catch(error) {
          if (error.message == 'Request failed with status code 404') {
            // Post original excluido!
            posts.data[i].sharePost = undefined
          }
        }
      }
      this.posts.push(posts.data[i])
    } 
  },  
  methods: {
    async updatePosts() {
      let novosPosts = []

      var rota = '/posts';
      if (this.$route.query.archive == 'true') {rota = '/post/list/save/'}
      let posts = await axios.get(`${hostServer}${rota}`, getHeader())
      for (let i=0; i<posts.data.length; i++) {
          
        if (posts.data[i].sharePost != undefined) {
          try {
            var data = await axios.get(`${hostServer}/post/${posts.data[i].sharePost}`, getHeader())
            posts.data[i].sharePost = data.data[0]
          } catch(error) {
            if (error.message == 'Request failed with status code 404') {
              // Post original excluido!
              posts.data[i].sharePost = undefined
            }
          }
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