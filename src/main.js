import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
const app = createApp(App)
const {hostServer} = require('./connections');

app.config.globalProperties.$filters = {
  processImg(value) {
    if(value == '' || value == undefined) {
      return "/user.webp"
    }
    return `${hostServer}/images/clients/${value}`
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
