<template>
  <div class="home">
    <Navbar />
    <div class="my-profile">
      <img v-if="user.img == '' || user.img == undefined" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${user.img}`' alt="">

      <div class="name-config">
        <h2>{{user.name}}</h2><router-link to="/EditProfile"><i class="fas fa-cog"></i></router-link>
      </div>
      
      <div class="statistics">
        <a href="#">174 publicações </a>
        <a href="#">820 seguidores </a>
        <a href="#">721 seguindo </a>
      </div>

      <div class="citation">
        <p>{{motivational}}</p>
      </div>

      <Modal v-if="showModal == true" :titleModal="this.titleModal" :textModal="this.textModal" @cancelModel="cancelModel()"/>

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

   <NewPost @updatePostsEvent="updatePosts()" :img="user.img"/>

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
import Modal from '../components/Modal.vue';

export default {
  name: 'MyPosts',
  components: {
    NewPost,
    Post,
    Navbar,
    Modal
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
      hostServer:hostServer,
      myId: '',
      img: '',
      user: {},
      motivational: '',
      showModal: false,
      titleModal: '',
      textModal: '',
      newText: ''
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
   created() {
    axios.get(`${hostServer}/me`, getHeader()).then(me => {
      this.myId = me.data[0]._id;
      this.img = me.data[0].img;
      this.user = me.data[0];
      this.motivational = this.user.motivational;
    })
    axios.get(`${hostServer}/posts`, getHeader()).then(posts => {
      this.posts = posts.data
    })
  },  
  methods: {
    alternateModel(title, texto) {
      this.showModal = !this.showModal;
      this.titleModal = title;
      this.textModal = texto;
    },
    cancelModel() {
      this.showModal = !this.showModal;
    },
    updatePosts() {
      axios.get(`${hostServer}/posts`, getHeader()).then(posts => {
        this.posts = posts.data
      })
    }
  }
}
</script>


<style scoped>
.my-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
  padding-bottom: 0;
}

.my-profile img {
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  height: 100%;
  border-radius: 50%;
}

.my-profile .name-config {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-profile .name-config h2 {
  font-size: 1.4rem;
  padding: 5px 0;
}

.my-profile .name-config i {
  font-size: 1.4rem;
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.2s;
}

.my-profile .name-config i:hover {
  color: rgba(255, 255, 255, 1);
} 

.citation {
  width: 100%;
  padding: 20px 10px;
  text-align: center;
}

.bio-and-work {
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.biograph {}

.work {}

.menu-items {
  width: 100%;
  display: flex;
  padding-top: 20px;
}

.menu-items button {
  display: block;
  flex: 1;
  background: transparent;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.menu-items button:hover {
  font-weight: 700;
  border-bottom: 2px solid var(--border-color);
} 
</style>
