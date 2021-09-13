<template>
  <div class="container">
    <Navbar />

    <BasicLoaderVue :activated="user.name === undefined" />

    <div v-if="user.name !== undefined" class="my-profile">
      <img :src="$filters.processImg(user.img)" alt="">

      <div class="name-config">
        <h2>{{user.name}}</h2>
        <router-link to="/EditProfile">
          <i v-if="idUser == myId" class="fas fa-cog"></i>
        </router-link>

        <router-link to="/Login">
          <i v-if="idUser == myId" class="fas fa-sign-out-alt"></i>
        </router-link>
      </div>
      
      <div class="statistics">
        <!--<p>174 publicações </p>
        <p>820 seguidores </p>
        <p>721 seguindo </p>-->
      </div>

      <div class="citation">
        <p>{{user.motivational}}</p>
      </div>

      <div class="bio-and-work">
        <div class="biograph">
          <p>
            <span v-for="bio in userBio" :key="bio">
              {{bio}} <br>
            </span>
          </p>
        </div>

        <div class="work">
          <div v-for="item in user.itemBio" :key="item._id" >
            <p v-if="item.typeItem == 'school'"><i class="fas fa-building"></i> {{item.text}}</p>
            <p v-if="item.typeItem == 'status'"><i class="fas fa-graduation-cap"></i> {{item.text}}</p>
            <p v-if="item.typeItem == 'work'"><i class="fas fa-heart"></i> {{item.text}}</p>
            <p v-if="item.typeItem == 'film'"><i class="fas fa-film"></i> {{item.text}}</p>
          </div>
        </div><!-- work -->
      </div>

      <div class="menu-items">
        <button>posts</button> 
        <!--<button>amigos</button>-->
      </div><!-- menu-items -->
    </div> 

    <NewPost v-if="idUser === myId && user.name !== undefined" @updatePostsEvent="updatePosts()" :img="user.img"/>
    <BasicLoaderVue v-bind:activated="loader"/>
    <div class="container-post" v-for="(post, index) in posts" :key="post._id + index">
      <Post v-bind:post="post" v-bind:myId="myId" v-bind:imgProfile="img" @updatePosts="updatePosts()" />      
    </div>

  </div>
</template>


<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import NewPost from '../components/Post/NewPost.vue';
import Post from '../components/Post/Post.vue';
import { hostServer } from '../connections';
import BasicLoaderVue from '../components/Loader/BasicLoader.vue';

export default {
  name: 'MyPosts',
  components: {
    NewPost,
    BasicLoaderVue,
    Post,
    Navbar
  },
  data() {
    return {
      posts: [],
      hostServer:hostServer,
      myId: '',
      idUser: '',
      img: '',
      user: '',
      newText: '',
      loader: true
    }
  },
  async created() {
    this.updateProfile()
  }, 
   computed: {
    userBio() {
      if (this.user.bio != undefined) {
        return `${this.user.bio}`.split('\n')
      }
      return ''
    }
  },
  watch:{
    $route(){
      this.updateProfile()
    }
  },
  methods: {
    async updateProfile() {
      let me = await axios.get(`${hostServer}/me`, getHeader())
      this.myId = me.data[0]._id;
      this.img = me.data[0].img;

      if (this.$route.query.id == undefined) {
        this.user = me.data[0];
        this.idUser = me.data[0]._id
      } else {
        me = await axios.get(`${hostServer}/user/${this.$route.query.id}`, getHeader())
        this.idUser = me.data[0]._id
        this.user = me.data[0];
      }

      this.updatePosts()
    },
    async updatePosts() { 
      let novosPosts = []
      var idUrl = this.myId;
      if (this.$route.query.id != undefined) { idUrl = this.$route.query.id }
      let posts = await axios.get(`${hostServer}/posts/user/${idUrl}`, getHeader())
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
      this.loader = false
    }
  }
}
</script>

