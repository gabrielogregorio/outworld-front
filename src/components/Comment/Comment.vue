<template> 
  <div>

  <BasicLoaderPurple :activated="userData.length === 0 || loader" />

    <div v-if="userData.length !== 0 || !loader" class="coments">

      <div class="profile">
        <img :src='$filters.processImg(userData.img)' alt=''>
      </div><!-- profile -->

      <div class="msg-options ">
        <div :class="deleteThisComment === true ? 'msg delete-coment' : 'msg'">
          <div class="msg-name-options">
            <div class="profile-user">
              <p><pre>{{userData.name}} </pre></p>
              <p><pre>{{$filters.processDate(postComment.createdAt) }}  </pre></p>
            </div>
 
            <div class="delete-comment" >
              <DropDownComment v-if="myId === userData._id" @deleteComment="deleteComment()" />
            </div>
            <!--<p><pre>Há 10 horas</pre></p> -->
          </div><!-- msg-name-options -->

          <div class="msg-data">
            <!-- <p>Economista</p>-->
          </div><!-- msg-data -->

          <div class="msg-body">
            <p>{{text}}</p>
          </div><!-- msg-body -->

        </div><!-- msg -->

        <div class="options">
          <button><!--Curtir (10)--></button>
          <button @click="replyComment()">Responder</button>
          <!-- commentId, postId --> 
          <button v-if="counter !== 0" @click="showRepliesComments()" >Respostas {{counter}}</button>
          <div v-if="showReplies === true" >
            <div v-for="postComment in postComment.replies" :key="postComment._id">
              <Comment
                v-bind:postComment="postComment"
                @newComment="newComment()"
                v-bind:user="postComment.user"
                :myId="myId"
                v-bind:text="postComment.text"
                :postId="postId"
                :commentId="postComment._id"
                :imgProfile="imgProfile"/>
            </div>
          </div>

          <MakeComment
            v-if="showComment === true"
            :postId="postId"
            :commentId="commentId"
            @newComment="newComment()"
            :imgProfile="imgProfile"/>
        </div><!-- options -->
      </div><!-- msg-options -->
    </div><!-- coments -->

  </div>

</template>


<script>
import { hostServer } from '../../connections';
import axios from 'axios';
import getHeader from '../../getToken';
import MakeComment from '../Comment/MakeComment.vue';
import BasicLoaderPurple from '../Loader/BasicLoaderPurple.vue';
import DropDownComment from '../dropdow/DropDownComment.vue';

export default {
  name: 'Comment',
  data(){
    return {
      hostServer: hostServer,
      userData: [],
      showComment: false,
      loader: true,
      counter: 0,
      showReplies: false,
      deleteThisComment: false
    } 
  }, 
  components: {
    MakeComment,
    DropDownComment,
    BasicLoaderPurple
  },
  async created() {
    this.counter = this.counterDeepth(this.postComment)
    axios.get(`${this.hostServer}/user/${this.user}`, getHeader()).then(userData => {
      this.userData = userData.data[0]
      this.loader = false
    })
  },
  props: {
    user: String,
    myId: String,
    text: String,
    commentId: String,
    postId: String,
    imgProfile: String,
    postComment: Object
  },
  watch: {
    postComment() {
      this.counter = this.counterDeepth(this.postComment)
    }
  },
  methods:{
    deleteComment() { 
      this.deleteThisComment = true
       axios.delete(`${hostServer}/post/comment/${this.commentId}`, getHeader())
        .then(() => {
          this.$emit("newComment", "")
        })
    },
    counterDeepth(comments, counter=-1) { // ignorar o proprio comentario
      if(comments === undefined || comments?.['replies'] === undefined) {
        return counter
      }
      counter = counter + 1

      for(let i = 0; i < comments['replies'].length; i++) {
        counter = this.counterDeepth(comments['replies'][i], counter)
      }

      return counter  
    },

    showRepliesComments() {
      this.showReplies = !this.showReplies
    },
    newComment() {
      this.$emit("newComment", "")
    },
    replyComment() {
      this.showComment = !this.showComment
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
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.msg-options {
  width: 100%;
}

.msg {
  background: var(--background-4);
  padding: 10px;
  width: 100%;
  border-radius: 0 5px 5px 5px;
}

.delete-coment {
  animation: deleting 2s linear infinite alternate;
}

@keyframes deleting {
  0% {
    filter: opacity(0.6);
  }

  100% {
    filter: opacity(0.3);
  }
}

.msg-name-options {
  display: flex;
  justify-content: space-between;
}

.msg-name-options .delete-comment {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.msg-name-options .delete-comment i {
  cursor: pointer;
  padding: 5px;
}
.msg-name-options .profile-user {
  padding-bottom: 5px;
  font-size: 0.8rem;
}

.msg-name-options .profile-user p:nth-child(1) pre{
  font-weight: 700;
}

.msg-name-options .profile-user p:nth-child(2) pre{
  font-size: 0.8rem;
  font-weight: 500;
}

.msg-data p {
  font-size: 0.9rem;
  color: var(--color-4);
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
  color: var(--background-button-1);
} 
</style>
