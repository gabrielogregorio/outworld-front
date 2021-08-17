<template> 
  <div class="container-user">
    <div class="img-user-perfil" @click="openProfile(user._id)">
      <img v-if="user.img == '' || user.img == undefined" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${user.img}`' alt="">
    </div><!-- img-user-perfil -->

    <div class="info-user">
      <div class="info-user-perfil">
        <div class="info-user-superior">
          <h2 @click="openProfile(user._id)" >{{user.name}}</h2>
          <p @click="openProfile(user._id)" class="info-username">@user</p>
          <button class="buttonDefault activeButtonDefault" v-if="listFollow.includes(user._id) == true" @click="followPerson()">Seguindo</button>
          <button class="buttonDefault" v-else @click="followPerson()">Seguir</button>
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
    followPerson(){
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
  data() {
    return {
      hostServer: hostServer
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
  background-color: var(--primary-background);
  border: var(--border);
  border-top: 0;
}

.img-user-perfil {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.img-user-perfil img {
  width: 100%;
  height: 100%;
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
  font-weight: 700;
  color: var(--primary-text-color);
  font-size: 1rem;
  cursor: pointer;
}

.info-user-superior .info-username {
  font-weight: 700;
  flex: 1;
  margin-left: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.buttonDefault {
  width: 110px;
  transition: 0.5s;
}

</style>
