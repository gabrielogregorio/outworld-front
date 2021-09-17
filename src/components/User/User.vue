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


<style scoped>
div.container-user {
  display: flex;
  max-width: 900px;
  width: 100%;
  padding: 10px 30px;
  margin: 0 auto;
  background-color: var(--background-2);
  border: var(--border);
  border-top: 0;
}

.img-user-perfil {
  margin-right: 15px;
  width: 50px;
  height: 50px;
}

.img-user-perfil img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.info-user {
  width: 100%;
}

.info-user-perfil {
  width: 100%;
}

.info-user-superior {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.info-user-superior h2 {
  font-weight: 500;
  cursor: pointer;
  color: var(--color-4);
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden; 
  width: 30vw; 
  white-space: nowrap;
}

.info-user-superior p {
  cursor: pointer;
  font-weight: 500;
  margin-left: 5px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden; 
  width: 30vw; 
  white-space: nowrap; 
}

.button-default {
  width: 110px;
  transition: 0.5s;
}

@media screen and (max-width: 600px){
  div.container-user {
    padding: 2%;
  }
}
</style>
