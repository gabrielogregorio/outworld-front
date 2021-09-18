<template> 
  <div class="container-user">
    <div class="img-user-perfil" @click="openProfile(user._id)">
      <img :src="$filters.processImg(user.img)" alt="">
    </div><!-- img-user-perfil -->

    <div class="info-user">
      <div class="info-user-perfil">
        <div class="info-user-superior">
          <div>
            <h2 @click="openProfile(user._id)" >{{user.name}}</h2>
            <p @click="openProfile(user._id)">@{{user.username}}</p>
          </div>
          <div>
            <button class="button-default active-button-default" v-if="listFollowuUser.includes(user._id) == true" @click="followPerson(user._id)">Seguindo</button>
            <button class="button-default" v-else @click="followPerson(user._id)">Seguir</button>
          </div>
        </div><!-- info-user-superior -->
      </div><!-- info-user-perfil -->
    </div><!-- info-user -->
  </div><!-- container-user -->
</template>

<script>
import { hostServer } from '../../connections';
import axios from 'axios'
import getHeader from '../../getToken';

export default {
  name: 'User',
  components: {
  },
  props: {
    user: Object,
    listFollow: Array
  },
  methods: {
    followPerson(id){

      // Realiza uma alteração local, antes dela ser confirmada pelo servidor
      if(this.listFollowuUser.includes(id)) {
        this.listFollowuUser = this.listFollowuUser.filter(user => user !== id)
      } else {
        this.listFollowuUser.push(id)
      }

      axios.post(`${hostServer}/user/follow/${this.user._id}`, {}, getHeader()).then(() => {
        this.$emit("updateUsers", "")
      })
    },
    openProfile(id) {
      this.$router.push({
        path:"/Profile",
        query: {id}
      })    
    }
  },

  // Atualiza as variáveis locais de acordo com o servidor
  watch: {
    listFollow() {
      this.listFollowuUser = this.listFollow
    }
  },
  data() {
    return {
      hostServer: hostServer,
      listFollowuUser: this.listFollow
    }
  },
  created() {
  }
}
</script>
