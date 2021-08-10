<template>
  <div class="home">
    <Navbar />

    <NewPost @updatePostsEvent="updatePosts()" />

    <section>
      <div class="container">

        <h1>Meus posts</h1>
        <table>
          <tr>
            <th>Titulo</th>
            <th>Descricao</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>

          <tr v-for="post in posts" :key="post.id">
            <td>{{post.title}}</td>
            <td>{{post.body}}</td>
            <td>{{post.user.name}}</td>
            <td>
              <button class="blue">View</button>
              <a class="green">View 2</a>
            </td>
          </tr>

        </table>  
      </div>
    </section>


  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import NewPost from '../components/NewPost.vue';

export default {
  name: 'MyPosts',
  components: {
    Navbar,
    NewPost
  },
  data() {
    return {
      posts: []
    }
  },
   created() {
    axios.get('http://localhost:3333/myPosts', getHeader()).then(posts => {
      this.posts = posts.data
    })
  },  
  methods: {
    updatePosts() {
      axios.get('http://localhost:3333/posts', getHeader()).then(posts => {
        this.posts = posts.data
      })

    }
  },
 
}
</script>
