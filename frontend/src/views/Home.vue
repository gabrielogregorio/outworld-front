<template>
  <div >
    <Navbar />
 
    <NewPost @updatePostsEvent="updatePosts()" />

    <div class="container-post" v-for="post in posts" :key="post.id">
      <Post :post="post" :myId="myId" @updatePosts="updatePosts()"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import getHeader from '../getToken';
import NewPost from '../components/NewPost.vue';
import Navbar from '../components/Navbar.vue';
import Post from '../components/Post.vue';

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
      myId: ''
    }
  },
   created() {
    axios.get('http://localhost:3333/me', getHeader()).then(me => {
      this.myId = me.data[0]._id;
    })
    axios.get('http://localhost:3333/posts', getHeader()).then(posts => {
      this.posts = posts.data
    })
  },  
  methods: {
    updatePosts() {
      axios.get('http://localhost:3333/posts', getHeader()).then(posts => {
        this.posts = posts.data
      })
    },
  }
}
</script>

<style scoped>

</style>