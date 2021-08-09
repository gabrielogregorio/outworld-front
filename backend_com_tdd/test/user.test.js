let {app, mongoose}  = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let mainUser = {name: 'adminTeste', email: 'admin@teste.com', password: 'adminPassword' }
let user = {name:'sherek', email:'no-valid-email@@@.com', password: 'asdmkaksasdas'}
let user2 = {name:'tesla', email:'issoNotExists', password: 'aaaaaaa'}
var tokenValido = {}
var idUsuarioValido = '';

beforeAll(() => {
  return request.post('/user')
    .send({...mainUser})
    .then(res => {})
    .catch(error => fail(error))
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

describe("Login no sistema para permitir uso dos posts", () => {
  test("Deve acessar o sistema e fornecer um token válido para os outros testes", () => {
    return request.post('/auth')
      .send({email: 'gabriel', password: 'gabriel'})
      .then(res => {
        tokenValido = { authorization:"Bearer " + res.body.token}
    }).catch(error => fail(error))
  })
})

describe('Cadastro de usuários', () => {

  test("Deve cadastrar um usuário com sucesso!", () => {
    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.id).toBeDefined()
      idUsuarioValido = res.body.id;
    }).catch(error => fail(error))
  })

  test("Deve retornar um Usuário", () => {
    return request.get(`/user/${idUsuarioValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toBeDefined()
        expect(res.body[0].email).toBeDefined()
    }).catch(error => fail(error))
  })

  test("Deve retornar erro 500 para um parametro invalido", () => {
    return request.get('/user/aaaaaa')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(500)
    }).catch(error => fail(error))
  })

  test("Deve retornar erro 404 ao não encontrar o usuario", () => {
    return request.get('/user/111111111111111111111111')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(404)
    }).catch(error => fail(error))
  })

  test('Validar token de um usuário', () => {
    return request.post('/auth').send({email: user.email, password: user.password}).then(res => {
      tokenValido = { authorization:"Bearer " + res.body.token}
      return request.post('/validate').send()
        .set(tokenValido)
        .then(res2 => {
        expect(res2.statusCode).toEqual(200)
      }).catch(error => fail(error))
    })
  })
  
  test('Impedir acesso com token invalido', () => {
    return request.post('/validate').send().set(
      { authorization:"Bearer xxxxxxxxxxxxxxxxxx"}
    ).then(res2 => {
      expect(res2.statusCode).toEqual(403)
    }).catch(error => fail(error))
  })

  test("Deve impedir cadastro com dados vazios", () => {
    let user = {name: '', email:'', password: ''};

    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(400) // bad request
    }).catch(error => fail(error))
  })


  test("Deve impedir um cadastro com e-mail repetido", () => {
    return request.post('/user').send(user2).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(user2.email)
      user2.id = res.body.id

      return request.post('/user').send(user2).then(res => {
          expect(res.statusCode).toEqual(400)
          expect(res.body.error).toEqual('E-mail já cadastrado!')
      }).catch(error2 => fail(error2))
    }).catch(error => fail(error))
  })

 
  
  test("Deve retornar erro 400 ao tentar editar um usuário passando parametros incorretos", () => {
    return request.put(`/user/${user2.id}`, {})
      .set(tokenValido)
      .send({name: ''})
      .then(res => {
        expect(res.statusCode).toEqual(400)
    }).catch(error => fail(error))
  })
  
  test("Deve permitir a edição de um usuario!", () => {
    return request.put(`/user/${user2.id}`)
      .set(tokenValido)
      .send({name: 'alterado', password: 'alterado'})
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual('alterado')
    }).catch(error => fail(error))
  })
})

describe('Autenticacao de usuários', () => {
  test("Deve retornar um token ao logar", () => {
    return request.post('/auth').send({email:mainUser.email, password:mainUser.password}).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.token).toBeDefined() // Não é undefined
    }).catch(error => fail(error))
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

describe('Visualização de usuários', () => {
  test("Deve retornar uma lista de usuários", () => {
    return request.get('/users')
    .set(tokenValido)
    .then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBeGreaterThan(1)
    }).catch(error => fail(error))
  })
})