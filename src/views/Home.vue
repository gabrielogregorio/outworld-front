<template> 
  <div class="container">
    <Navbar /> 
    <NewPost @updatePosts="updatePosts()" :img="img" />
    <BasicLoaderVue v-bind:activated="loader"/>
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
import BasicLoaderVue from '../components/Loader/BasicLoader.vue';



export default {
  name: 'Home',
  components: {
    NewPost,
    Post,
    BasicLoaderVue,
    Navbar
  },
  data() {
    return {
      posts: [],
      myId: '',
      img: '',
      loader: true
    }
  },
  watch:{
    $route(){
      this.updatePosts()
    }
  }, 
  async created() {
    axios.get(`${hostServer}/me`, getHeader()).then(me => {
      this.myId = me.data[0]._id;
      this.img = me.data[0].img;
      this.posts = []
      this.updatePosts()
      this.loader = false
    })

  },

  methods: {
    async updatePosts() {
      let novosPosts = []

      let rota = '/posts';
      if (this.$route.query.archive == 'true') {rota = '/post/list/save/'}
      let posts = await axios.get(`${hostServer}${rota}`, getHeader())

      for (let i=0; i<posts.data.length; i++) {
        if (posts.data[i].sharePost != undefined) {
          try {
            let data = await axios.get(`${hostServer}/post/${posts.data[i].sharePost}`, getHeader())
            posts.data[i].sharePost = data.data[0]
          } catch(error) { 
            if(error.response.status === 404) {
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


