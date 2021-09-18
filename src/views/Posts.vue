<template> 
  <div class="container">
    <NewPost  v-if="idUrl === myId && idUrl !== ''" @updatePosts="updatePosts()" :img="img" />
    <BasicLoaderVue v-bind:activated="loader"/>
    <div v-for="(post, index) in posts" :key="post._id + index">
      <Post v-bind:post="post" v-bind:myId="myId" v-bind:imgProfile="img" @updatePosts="updatePosts()" />      
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import getHeader from '../getToken';
import Post from '../components/Post/Post.vue';
import { hostServer } from '../connections';
import BasicLoaderVue from '../components/Loader/BasicLoader.vue';
import NewPost from '../components/Post/NewPost.vue';


export default {
  name: 'Posts',
  components: {
    Post,
    NewPost,
    BasicLoaderVue
  },

  props: {
    myId: String,
    img: String
  },

  data() {
    return {
      posts: [],
      idUrl: '',
      loader: true
    }
  },

  watch:{
    $route(){
      this.updatePosts()
    },
    myId() {
      this.updatePosts()
    }
  },

  async created() {
    this.posts = []
    this.updatePosts()
  },

  methods: {
    async updatePosts() {
      // Se o props não tiver chegado corretamente ainda
      if(!this.myId) { return }

      // Telas que o watcher pode fazer alterações
      // Evita que o watcher ative na tela de Edit posts
      // por exemplo
      let screenWatchers = ['/Profile', '/Save', '/Home']

      if (!screenWatchers.includes(this.$route.path)) { return }


      let novosPosts = []
      let rota = ''
      this.idUrl = this.myId

      // Se existir o id de outro usuário
      // Busque os posts deste usuário
      // Caso contrário busque os posts
      // que o proprio usuário tem ou segue
      if (this.$route.query.id != undefined) {
         this.idUrl = this.$route.query.id
         rota = `/posts/user/${this.idUrl}`;

      // Se estiver renderizando o proprio perfil do usuário
      // Então mostre os posts do proprio usuário
      } else if (this.$route.path === '/Profile') {
         rota = `/posts/user/${this.idUrl}`;

      // Exibição de posts que aparecem na timeline de um 
      // usuário
      } else {
         rota = `/posts`;
      }

      // Se for para exibir os posts salvos pelo usuário
      if (this.$route.query.archive == 'true') {
        rota = '/post/list/save/'
      }

      // Obtenção dos posts
      let posts = await axios.get(`${hostServer}${rota}`, getHeader())

      // Loop pelos posts para processamento
      for (let i=0; i<posts.data.length; i++) {

        // Se for um post que referencia outro post
        if (posts.data[i].sharePost != undefined) {

          // Tente obter os dados do outro post
          try {
            // Salvou os dados do outro post
            let data = await axios.get(`${hostServer}/post/${posts.data[i].sharePost}`, getHeader())
            posts.data[i].sharePost = data.data[0]
          } catch(error) { 
            // Se o post tiver sido deletado
            if(error.response.status === 404) {
              posts.data[i].sharePost = undefined
            }
          }
        }
        novosPosts.push(posts.data[i])
      }
      // Atualiza os posts e finaliza o loader
      this.posts = novosPosts;
      this.loader = false
    }
  }
}
</script>
