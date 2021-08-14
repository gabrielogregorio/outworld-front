<template> 
  <div class="coments">
    <div class="profile">
      <img v-if="userData.img == '' || userData.img == undefined" src="/user.webp" alt="">
      <img v-else :src='`${hostServer}/images/clients/${userData.img}`' alt="">
    </div><!-- profile -->
    <div class="msg-options">
      <div class="msg">
        <div class="msg-name-options">
          <p><pre>{{userData.name}} </pre></p>
          <p><pre>{{userData.username | processUsername}} </pre></p>
          <p><pre>Há 10 horas</pre></p>
        </div><!-- msg-name-options -->

        <div class="msg-data">
          <p>Economista e cientista de dados em Uberlandia!</p>
        </div><!-- msg-data -->

        <div class="msg-body">
          <p>{{text}}</p>
        </div><!-- msg-body -->
      </div><!-- msg -->

      <div class="options">
        <button><!--Curtir (10)--></button>
      </div><!-- options -->
    </div><!-- msg-options -->
  </div><!-- coments -->
</template>


<script>
import { hostServer } from '../connections';
import axios from 'axios';
import getHeader from '../getToken';

export default {
  name: 'Comment',
  data(){
    return {
      hostServer: hostServer,
      userData: ''
    } 
  },
  created() {
    axios.get(`${this.hostServer}/user/${this.user}`, getHeader()).then(userData => {
      this.userData = userData.data[0]
    })
  },
  props: {
    user: String,
    text: String
  },
  filters: {
    processUsername: (value) => {
      if (value == '') {
        return '';
      } else {
        return `@${value}`;
      }
    }
  }
}
</script>


<style scoped>
.coments {
  display: flex;
  margin-bottom: 9px;
}

.profile {
  margin-right: 15px;
  max-width: 50px;
  max-height: 50px;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.msg-options {
  width: 100%;
}

.msg {
  background: #3a3b3c;
  padding: 10px;
  width: 100%;
  border-radius: 0 5px 5px 5px;
}

.msg-name-options {
  display: flex;
}

.msg-name-options p:nth-child(1) pre{
  font-weight: 700;
}

.msg-name-options p:nth-child(2) pre{
  font-weight: 500;
}

.msg-data p {
  font-size: 0.9rem;
  color: #c4c4c4;
}

.msg-body p {
  padding: 5px 0;
  word-break: break-all;
}

.options {
  width: 100%;
}

.options button {
  background: transparent;
  padding: 2px;
  border: 0;
  outline: none;
  cursor: pointer;
}

.options button:hover {
  color: var(--primary-blue-color);
} 
</style>
