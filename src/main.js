import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
const app = createApp(App)

app.config.globalProperties.$filters = {
  processImg(value) {
    if(value == '' || value == undefined) {
      return "/user.webp"
    }
    return `${value}`
  },
  processUsername: (value) => {
    if (value == '') {
      return '';
    } else {
      return `@${value}`;
    }
  }
}

app.use(router);
app.mount('#app')
