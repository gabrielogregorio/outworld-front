<template>
  <section>
    <div class="container">

      <label for="title">Titulo do post</label>
      <input type="text" v-model="title" name="title" id="title">

      <label for="body">Corpo do post</label>
      <textarea name="body" v-model="body" id="bod" cols="15" rows="3"></textarea>

      <button @click="createPost()">Post</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import getHeader from '../getToken';

export default {
  name: 'NewPost',
  data() {
    return {
      title: '',
      body: ''
    }
  },

  methods: {
    createPost() {
      if (this.title == '' || this.body == '' || this.title == undefined || this.body == undefined) {
        return;
      }
      axios.post('http://localhost:3333/post', {title: this.title, body: this.body}, getHeader()).then(() => {
        this.$emit("updatePostsEvent", "");
        this.title = ''
        this.body = ''
      }).catch(error => {
        console.log(error)
      })
    }

  }

}
</script>
