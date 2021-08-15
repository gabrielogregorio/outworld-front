<template>
  <div class="container">
    <Navbar />
    <section>
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
import User from '../components/User.vue'
import { hostServer } from '../connections';


export default {
  name: 'Users',
  components: {
    Navbar,
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

  methods: {
    updateUsers() {
      axios.get(`${hostServer}/me`, getHeader()).then(userMe => {
        this.userMe = userMe.data[0];
        axios.get(`${hostServer}/users`, getHeader()).then(users => {
          this.users = users.data;
        })
      })
    }
  },
   created() {
     this.updateUsers()
  }
}
</script>
