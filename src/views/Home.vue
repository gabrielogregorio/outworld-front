<template> 
  <div class="container">
    <Navbar /> 
    <Posts v-bind:myId="myId" v-bind:img="img" />
  </div>
</template>
<script>
import axios from 'axios';
import getHeader from '../getToken';
import Navbar from '../components/Navbar.vue';
import { hostServer } from '../connections';
import Posts from './Posts.vue';


export default {
  name: 'Home',
  components: {
    Posts,
    Navbar
  },
  data() {
    return {
      myId: '',
      img: ''
    }
  },
  async created() {
    axios.get(`${hostServer}/me`, getHeader()).then(me => {
      this.myId = me.data[0]._id;
      this.img = me.data[0].img;
    })
  }
}
</script>


