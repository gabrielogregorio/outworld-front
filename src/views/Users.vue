<template>
  <div class="container">
    <Navbar />
    <section>
      <BasicLoaderVue v-bind:activated="users.length === 0"/>
      <div v-for="user in users" :key="user.id">
        <User v-if="user._id != userMe._id" :user="user" :listFollow="userMe.followingIds" @updateUsers="updateUsers()"/>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import User from '../components/User/User.vue'
import { hostServer } from '../connections';
import BasicLoaderVue from '../components/Loader/BasicLoader.vue';


export default {
  name: 'Users',
  components: {
    Navbar,
    BasicLoaderVue,
    User
  },
  data() {
    return {
      users: [],
      userMe: [],
      myid: '',
      listaUsersFollow:[],
      usersTemp: []
    }
  },
   async created() {
     this.updateUsers()
  },
  methods: {
    updateUsers() {
      axios.get(`${hostServer}/me`, getHeader()).then(userMe => {
        this.userMe = userMe.data[0];
        axios.get(`${hostServer}/users`, getHeader()).then(users => {
          this.users = users.data;
        })
      })
    }
  }

}
</script>
