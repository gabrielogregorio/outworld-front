<template>
 <section> 
  <div class="container">
    <Navbar />
    <div class="my-profile">
      <img v-if="user.img == '' || user.img == undefined" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${user.img}`' alt="">
      <h2>{{user.name}}</h2>

      <div class="statistics">
        <a href="#">x publicações </a>
        <a href="#">x seguidores </a>
        <a href="#">x seguindo </a>
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
        </div>
      </div>

      <div class="menu-items">
        <button>posts</button>
        <button>fotos</button>
        <button>amigos</button>
      </div>
    </div>

    <div class="container-post" v-for="post in posts" :key="post.id">
      <Post v-bind:post="post" v-bind:myId="myId" v-bind:imgProfile="img" @updatePosts="updatePosts()" />      
    </div>

  </div>
  </section>  
</template>

<script>
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import { hostServer } from '../connections';
import axios from 'axios';
import Post from '../components/Post/Post.vue';
export default {
  name: 'ProfileUser',
  data() {
    return {
      posts: [],
      myId: '',
      img: '',
      user: {},
      hostServer:hostServer
    }
  },
  components: {
    Navbar,
    Post
  },
  computed: {
    userBio() {
      if (this.user.bio != undefined) {
        return `${this.user.bio}`.split('\n')
      }
      return ''
    }
  },
  methods: {
    
    async updatePosts() {
      let novosPosts = []
      let posts = await axios.get(`${hostServer}/posts/user/${this.$route.query.id}`, getHeader())
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
  },
   async created() {
    let me = await axios.get(`${hostServer}/me`, getHeader())
    this.myId = me.data[0]._id;
    this.img = me.data[0].img;


    let user = await axios.get(`${hostServer}/user/${this.$route.query.id}`, getHeader())
    this.user = user.data[0];


    this.posts = []

    let posts = await axios.get(`${hostServer}/posts/user/${this.$route.query.id}`, getHeader())
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
  }
}
</script>

