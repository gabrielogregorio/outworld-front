// Host de conexão da API
module.exports = {
  
  hostServer: process.env.PORT !== undefined ? 'https://rede-social-backend-000.herokuapp.com' : 'http://127.0.0.1:3000'
}
