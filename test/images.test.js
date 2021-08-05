let {app, mongoose} = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let userAny = {name: 'userTest', email: 'user@teste.com', password: 'adminPassword' }

afterAll(() => {
  // Finalização da suite
  return request.delete(`/user/${userAny.email}`).then(res => {
    return mongoose.connection.close();
  })
})

describe('Gerenciamento de imagens', () => {
  test("Deve cadastrar uma imagem pela URL", () => {

    return request.post('/user').send(userAny).then(res => {
      return request.post('/image').send(
        {
          name: 'Estação espacial',
          href: 'https://veja.abril.com.br/wp-content/uploads/2020/11/45585655102_340803e5f6_o.jpg.jpg',
          user: res.body.id
        }
      ).then(res => {
        expect(res.statusCode).toEqual(200)
      }).catch(error => {fail(error)})
    }).catch(error2 => {fail(error2)})
  })
})