<template>
  <div class="home">
    <Navbar />

    <NewPost @updatePostsEvent="updatePosts()" :img="img"/>

    <div class="container-post" v-for="post in posts" :key="post.id">
      <Post :post="post" :myId="myId" @updatePosts="updatePosts()" :imgProfile="img" />

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import NewPost from '../components/NewPost.vue';
import Post from '../components/Post.vue';
import { hostServer } from '../connections';

export default {
  name: 'MyPosts',
  components: {
    NewPost,
    Post,
    Navbar
  },
  data() {
    return {
      posts: [{
        _id: '',
        title: '',
        body: '',
        img: '',
        user: '',
        likes: []
      }],
      myId: '',
      img: ''
    }
  },
   created() {
    axios.get(`${hostServer}/me`, getHeader()).then(me => {
      this.myId = me.data[0]._id;
      this.img = me.data[0].img;
    })
    axios.get(`${hostServer}/posts`, getHeader()).then(posts => {
      this.posts = posts.data
    })
  },  
  methods: {
    updatePosts() {
      console.log('uodate!!!')
      axios.get(`${hostServer}/posts`, getHeader()).then(posts => {
        this.posts = posts.data
      })
    }
  }
}
</script>
