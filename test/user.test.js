let app = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let mainUser = {name: 'adminTeste', email: 'admin@teste.com', password: 'adminPassword' }

beforeAll(() => {
  // Vai rodar antes de qualquer teste
  return request.post('/user').send(mainUser).then(res => {}).catch(error => console.log(error))
})

beforeEach(() => { // afterEach...
  //Roda uma vez antes de cadas teste
})

afterAll(() => {
  // Finalização da suite
  return request.delete(`/user/${mainUser.email}`).then(res => {}).catch(error => console.log(error));
})

describe('Cadastro de usuários', () => {
  test("Deve cadastrar um usuário com sucesso!", () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    let user = {name: 'gabriel', email, password: 'gabriel'};

    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(email)
    })
  })


  test("Deve impedir cadastro com dados vazios", () => {
    let user = {name: '', email:'', password: ''};

    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(400) // bad request
    })
  })


  test("Deve impedir um cadastro com e-mail repetido", () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    let user = {name: 'gabriel', email, password: 'gabriel'};

    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(email)

      return request.post('/user').send(user).then(res => {
          expect(res.statusCode).toEqual(400)
          expect(res.body.error).toEqual('E-mail já cadastrado!')
      })
    })
  })
})


describe('Autenticacao de usuários', () => {
  test("Deve retornar um token ao logar", () => {
    return request.post('/auth', {email:mainUser.email, password:mainUser.password}).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.token).toBeDefined() // Não é undefined
    }).catch(error => {fail(error)})
  })
})