<template>
  <div class="home">
    <Navbar />

    <NewPost @updatePostsEvent="updatePosts()" :img="img"/>

    <div class="container-post" v-for="post in posts" :key="post.id">
      <Post :post="post" :myId="myId" @updatePosts="updatePosts()"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import NewPost from '../components/NewPost.vue';
import Post from '../components/Post.vue';

export default {
  name: 'MyPosts',
  components: {
    Navbar,
    NewPost,
    Post
  },
  data() {
    return {
      posts: [],
      myId: '',
      img: ''
    }
  },
   created() {
    axios.get('http://localhost:3333/me', getHeader()).then(me => {
      this.myId = me.data[0]._id;
      this.img = me.data[0].img;
    })
    axios.get('http://localhost:3333/myPosts', getHeader()).then(posts => {
      this.posts = posts.data
    })
  },  
  methods: {
    updatePosts() {
      this.$router.push({name:'Home'})
    }
  }
 
}
</script>
