
<template> 
  <div class="message-container">
    <Navbar /> 
    <div class="users-message">
      <div class="users" id="scrool">
        <div v-for="(user, index) in users" @click="selectUser(index)" :key="user._id + index" :class="index == userSelect ? 'user selected' : 'user'">
          <div class="user-img">
            <img :src="$filters.processImg(user.img)" alt="">
          </div><!-- user-img -->
          <div class="user-info">
            <p class="user-info-username">{{user.name}}</p>
            <div>
              <span class="nova-msg" v-if="messagesRecibes.includes(user._id)">Nova</span>
              <span class="nova-msg-hidden" v-else></span>
            </div>
          </div><!-- user-info -->
        </div> <!-- user -->
      </div><!-- users -->

      <div class="messages">
        <div class="message" @scroll="eventScrool">
          <div v-for="(message, index) in messages" :key="message._id + index" :class="message.from._id == myId ? 'message-item this' :'message-item reply'">
            <p>{{message.message}}</p>
          </div><!-- message-item -->
        </div><!-- message -->
 
        <div class="send-messages">
          <div class="input"><input v-model="message" type="text" placeholder="Sua mensagem"></div>
          <button  @click="sendMessage()">Enviar <i class="fas fa-paper-plane"></i></button>
        </div><!-- send-messages -->
      </div><!-- messages -->
    </div><!-- users-message -->
  </div><!-- container -->
</template>


<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import getHeader from '../getToken';
import { hostServer, hostWebsocket } from '../connections';
import { inject } from 'vue'

export default {
  name: 'Users',
  components: {
    Navbar
  },
  setup() {
    const newMessage = inject('newMessage')

    return {
      newMessage
    }
  },

  data() {
    return {
      users: [],
      hostServer: hostServer,
      userSelect: 0,
      messages: [],
      messagesRecibes: [],
      myId: '',
      message: '',
      idSendMesssage: '',
      connection: null
    }
  },
  created() {
    axios.get(`${hostServer}/me`, getHeader()).then(res => {
      this.myId = res.data[0]._id
      this.updateMessages()
    })

    // Realiza uma conexão com o servidor
    this.connection = new WebSocket(`${hostWebsocket}/`)

    // Recebe mensagens do servidor
    this.connection.onmessage = (event) => {
      // Realiza o parse das mensagens
      let msg = JSON.parse(event.data); 

      // Indica que uma conexão acabou de ser feita
      if(msg.type === 'connected') {

        // Realiza uma requisição para que o servidor saiba quem é o usuário 
        // conectado ao socket com o UUID X
        axios.post(`${hostServer}/connectSocket`,
          {
              socketUuid:msg.socketUuid
          }, getHeader(), ).then(() => {}).catch((error) => {
          console.log(error)
        })

      // Servidor avisou que o usuário recebeu uma mensagem
      } else if(msg.type === 'RECIVE_MESSAGE') {
          //console.log('mensagem de ', msg.from)
          //console.log('Conteudo', msg.message)
          if(!this.messagesRecibes.includes(msg.from)) {
            this.messagesRecibes.push(msg.from)
          }

          // Atualiza as mensagens
          this.updateMessages()
          //newMessage = true
      }
    }
    // Conectado ao socket
    //this.connection.onopen = function() {
    //  console.log("Successfully connected to the echo websocket server...")
    //}
  },
  methods: {
    eventScrool(event) {
      let idUserSelected = this.idSendMesssage

      // Usuário atual está na lista de mensagens recebidas não visualizadas
      if (this.messagesRecibes.includes(idUserSelected)) {
        // Distancia da parte inferior da tela
        let distanceBottom = event.target.scrollTop + event.target.clientHeight
        let heigthScrollBar = event.target.scrollHeight

        if (distanceBottom === heigthScrollBar) {
          // Remove o usuário da lista de mensagens recebidas
          this.messagesRecibes = this.messagesRecibes.filter(message => message !== idUserSelected)
        }
      }
  
    },

    //sendMessage: function(message) {
    //  console.log('azaaa')
    //  this.connection.send(JSON.stringify({message, type: 'NOVA_MENSAGEM'}));
    //},

    // Usuário faz uma requisição ao servidor, indicando que enviou uma mensagem
    // a um usuário
    sendMessageUser(to, message) {
      axios.post(`${hostServer}/sendMessageUser`, { to, message, from:this.myId }, getHeader(), ).then(() => {
      }).catch(() => {})
    },

    sendMessage(){
      if (this.message != '') {
        this.sendMessageUser(this.idSendMesssage, this.message)
        axios.post(`${hostServer}/message`, {
          to: this.idSendMesssage,
          message: this.message
        }, getHeader()).then(() => {
          this.updateMessages()
          this.message = ''
        })
      }
    },
    selectUser(item) {
      this.userSelect = item;
      this.updateMessages()
    },
    updateMessages() {
      axios.get(`${hostServer}/messages/users`, getHeader()).then(res => {
        this.users = res.data;
        if (res.data.length != 0) { // Sem nenhuma mensagem
          this.idSendMesssage = res.data[this.userSelect]._id
          axios.get(`${hostServer}/message/${this.idSendMesssage}`, getHeader()).then(res2 => {
            this.messages = res2.data;
          })
        } else {
          this.idSendMesssage = -1;
          this.userSelect = -1;
        }
      })
    }
  },
  watch: {
  }
}
</script>
