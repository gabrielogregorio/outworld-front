let {app, mongoose}  = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let mainUser = {name: 'adminTeste', email: 'admin@teste.com', password: 'adminPassword' }
let user = {name:'sherek', email:'no-valid-email@@@.com', password: 'asdmkaksasdas'}
let user2 = {name:'tesla', email:'issoNotExists', password: 'aaaaaaa'}

beforeAll(() => {
  return request.post('/user')
      .send({...mainUser})
      .then(res => {})
      .catch(error => fail(error))
})

beforeEach(() => { // afterEach...
  //Roda uma vez antes de cadas teste
})

afterAll(() => {
  // Finalização da suite
  return request.delete(`/user/${mainUser.email}`).then(res => {
    return request.delete(`/user/${user.email}`).then(res => {
      return request.delete(`/user/${user2.email}`).then(res => {
        return mongoose.connection.close();
      })
    })
  })
})



describe('Cadastro de usuários', () => {
  test("Deve cadastrar um usuário com sucesso!", () => {
    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.id).toBeDefined()
    })
  })


  test("Deve impedir cadastro com dados vazios", () => {
    let user = {name: '', email:'', password: ''};

    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(400) // bad request
    })
  })


  test("Deve impedir um cadastro com e-mail repetido", () => {

    return request.post('/user').send(user2).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(user2.email)

      return request.post('/user').send(user2).then(res => {
          expect(res.statusCode).toEqual(400)
          expect(res.body.error).toEqual('E-mail já cadastrado!')
      })
    })
  })
})


describe('Autenticacao de usuários', () => {
  test("Deve retornar um token ao logar", () => {
    return request.post('/auth').send({email:mainUser.email, password:mainUser.password}).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.token).toBeDefined() // Não é undefined
    }).catch(error => {fail(error)})
  })

  test("Deve impedir o login de um usuário não cadastrado", () => {
    return request.post('/auth', {email:'invalid_email_test@invalid.invalid!', password:'aaaaaaaaa'}).then(res => {
      expect(res.statusCode).toEqual(403)
    }).catch(error => {fail(error)})
  })

  test("Deve impedir o login com uma senha errada", () => {
    return request.post('/auth', {email:mainUser.email, password:'senha invalida!'}).then(res => {
      expect(res.statusCode).toEqual(403)
    }).catch(error => {fail(error)})
  })

})