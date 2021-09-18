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

        <div v-if="idUser == myId" class="themes">
          <div @click="() => {this.themeSeleted = 'dark'}" class="theme theme-dark"></div>
          <div @click="() => {this.themeSeleted = 'purple'}" class="theme theme-purple"></div>
          <div @click="() => {this.themeSeleted = 'light'}" class="theme theme-light"></div>
        </div>
      </div>

      <div class="menu-items">
        <button>posts</button> 
        <!--<button>amigos</button>-->
      </div><!-- menu-items -->
    </div> 

    <Posts v-bind:myId="myId" v-bind:img="img" />

  </div>
</template>


<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import { hostServer } from '../connections';
import BasicLoaderVue from '../components/Loader/BasicLoader.vue';
import Posts from './Posts.vue';


export default {
  name: 'MyPosts',
  components: {
    BasicLoaderVue,
    Posts,
    Navbar
  },
  data() {
    return {
      darkMode: false,
      hostServer,
      myId: '',
      idUser: '',
      img: '',
      user: '',
      themeSeleted: ''
    }
  },
  async created() {
    this.updateProfile()

    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if(theme === undefined) {
      this.themeSeleted = 'dark'
    } else {
      this.themeSeleted = theme
    }

    if (this.themeSeleted === 'dark') {
      htmlElement.setAttribute('theme', 'dark')
    } else if (this.themeSeleted === 'purple') {
      htmlElement.setAttribute('theme', 'purple');
    } else if(this.themeSeleted === 'light') {
      htmlElement.setAttribute('theme', 'light');
    }
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
    },
    themeSeleted() {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (this.themeSeleted === 'dark') {
          localStorage.setItem("theme", 'dark');
          htmlElement.setAttribute('theme', 'dark');
      } else if (this.themeSeleted === 'purple'){
          localStorage.setItem("theme", 'purple');
          htmlElement.setAttribute('theme', 'purple');
      } else if (this.themeSeleted === 'light'){
          localStorage.setItem("theme", 'light');
          htmlElement.setAttribute('theme', 'light');
      }
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
    }
  }
}
</script>
