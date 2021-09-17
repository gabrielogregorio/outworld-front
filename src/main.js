import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/styles.scss'

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
  },

  processEdited: (edited) => {
    if (edited === true) {
      return ' · editado'
    }
    return null
  },
  processDate: (value) => {
    if(value !== undefined) {
      let date1 = Date.now()
      let date2 = new Date(value) // 2021-09-17T15:09:44.839Z

      let diffMs = date1 - date2
      let diffDays = Math.floor(diffMs / 86400000); // days
      let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

      // Nenhum dia, nenhuma hora, nenhum minuto, postado agora!
      if(diffDays === 0 && diffHrs === 0 && diffMins === 0) {
        return 'A alguns segundos'
      }

      // Á alguns minutos
      if(diffDays === 0 && diffHrs === 0) {
        if(diffMins === 1) {
          return `A 1 minuto`
        } else {
          return `A ${diffMins} minutos`
        }
      }

      // Há algumas horas
      if(diffDays === 0) {
        if(diffHrs === 1) {
          return `A 1 hora`
        } else {
          return `A ${diffHrs} horas`
        }
      }

      // A pelo menos um dia
      if(diffDays === 1) {
        return `Ontem`
      } else {
        return `A ${diffDays} dias`
      }
    }
  }
}

app.use(router);
app.mount('#app')
