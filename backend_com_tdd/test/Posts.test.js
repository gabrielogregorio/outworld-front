let {app, mongoose} = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let userAny = {name: 'userTest', email: 'user@teste.com', password: 'adminPassword'}
let post = {
  title: 'Estação espacial',
  body: 'Um body qualquer',
  test: true
}
var idPostValido = "";
var tokenValido = {}

afterAll(() => {
  // Finalização da suite
  return request.delete(`/user/${userAny.email}`).then(res => {
    return request.delete(`/image`).then(res => {
      return mongoose.connection.close();
    })
  })
})

describe("Login no sistema", () => {
  test("Deve acessar o sistema e fornecer um token válido para os outros testes", () => {
    return request.post('/auth').send({email: 'gabriel', password: 'gabriel'}).then(res => {
      tokenValido = { authorization:"Bearer " + res.body.token}
    })
  })
})

describe('Gerenciamento de imagens', () => {
  test("Deve cadastrar uma imagem pela URL", () => {

    return request.post('/user').send(userAny).then(res => {
      post.user = res.body.id;

      return request.post('/post')
        .send(post)
        .set(tokenValido)
        .then(res => {
          expect(res.statusCode).toEqual(200)
      }).catch(error => {fail(error)})
    }).catch(error2 => {fail(error2)})
  })


  test("Deve retornar uma lista com todos os usuários e suas imagens", () => {
    return request.get('/posts')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].user.name).toBeDefined()
        expect(res.body[0].body).toBeDefined()
        idPostValido = res.body[0]._id
    })
  })
  
  test("Deve retornar um post", () => {
    return request.get(`/post/${idPostValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].user.name).toBeDefined()
        expect(res.body[0].body).toBeDefined()
    })
  })

  test("Deve retornar erro 500 para um parametro invalido", () => {
    return request.get('/post/aaaaaa')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(500)
    })
  })

  test("Deve retornar erro 404 ao não encontrar o post", () => {
    return request.get('/post/111111111111111111111111')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(404)
    })
  })



})