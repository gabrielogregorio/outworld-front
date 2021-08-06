let {app, mongoose} = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let userAny = {name: 'userTest', email: 'user@teste.com', password: 'adminPassword'}
let image = {
  name: 'Estação espacial',
  href: 'https://veja.abril.com.br/wp-content/uploads/2020/11/45585655102_340803e5f6_o.jpg.jpg',
  test: true
}

  afterAll(() => {
  // Finalização da suite
  return request.delete(`/user/${userAny.email}`).then(res => {
    return request.delete(`/image/${image._id}`).then(res => {
      return mongoose.connection.close();
    })
  })
})

describe('Gerenciamento de imagens', () => {
  test("Deve cadastrar uma imagem pela URL", () => {

    return request.post('/user').send(userAny).then(res => {
      image.user = res.body.id;
      return request.post('/image').send(image).then(res => {
        expect(res.statusCode).toEqual(200)
      }).catch(error => {fail(error)})
    }).catch(error2 => {fail(error2)})
  })


  test("Deve retornar uma lista com todos os usuários e suas imagens", () => {
    return request.get('/').then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body[0].user.name).toEqual(userAny.name)
      expect(res.body[0].href).toEqual(image.href)
    })
  })

})