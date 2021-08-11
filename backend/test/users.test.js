let {app, mongoose}  = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
var tokenValido = {}
var idUsuarioValido = '';
let user = {name:'sherek', email:'no-valid-email', password: 'asdmkaksasdas'}

beforeAll(() => {
  return request.post('/configure').then(() => {}).catch(error => fail(error))
})
// Upload de imagens não está incluso nos testes

afterAll(() => {
  return request.delete(`/user/${user.email}`).then(res => {
    return request.post('/endconfigure').then(() => {
      return mongoose.connection.close();
    })
  })
})

describe('Cadastro e login de usuários', () => {
  test("Deve cadastrar um usuário com sucesso!", () => {
    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(user.email)
      expect(res.body.id).toBeDefined()
      expect(res.body.token).toBeDefined()
      idUsuarioValido = res.body.id;
    }).catch(error => fail(error))
  })

  test("Deve acessar o sistema e receber um token válido para os outros testes", () => {
    return request.post('/auth')
      .send({email: user.email, password: user.password})
      .then(res => {
        expect(res.body.token).toBeDefined()
        expect(res.statusCode).toEqual(200)
        tokenValido = { authorization:"Bearer " + res.body.token}
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
    return request.get('/user/aaa')
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
    return request.post('/user').send(user).then(res => {
      expect(res.statusCode).toEqual(400)
      expect(res.body.error).toEqual('E-mail já cadastrado!')
    }).catch(error => fail(error))
  })

  test("Deve retornar erro 400 ao tentar editar um usuário passando parametros faltantes", () => {
    return request.put(`/user/${idUsuarioValido}`, {})
    .set(tokenValido)
      .send({name: ''})
      .then(res => {
        expect(res.statusCode).toEqual(400)
    }).catch(error => fail(error))
  })
  
  test("Deve permitir a edição de um usuario!", () => {
    return request.put(`/user/${idUsuarioValido}`)
      .set(tokenValido)
      .send({name: 'alterado', password: 'gabriel'})
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual('alterado')
    }).catch(error => fail(error))
  })

  test("Deve permitir a edição de um usuario novamente!", () => {
    return request.put(`/user/${idUsuarioValido}`)
      .set(tokenValido)
      .send({name: user.name, password: user.password})
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(user.name)
    }).catch(error => fail(error))
  })

  test("Deve impedir um usuário editar outro!", () => {
    return request.put(`/user/9999999999999999999999999`)
      .set(tokenValido)
      .send({name: 'alterado', password: 'alterado'})
      .then(res => {
        expect(res.statusCode).toEqual(403)
    }).catch(error => fail(error))
  })

  test("Obter os dados de si mesmo", () => {
    return request.get('/me')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toEqual(user.name)
        expect(res.body[0].email).toEqual(user.email)
    }).catch(error => fail(error))
  })

  test("Deve impedir o login de um usuário não cadastrado", () => {
    return request.post('/auth')
      .send({email:'invalid_email_test', password:'aaaaaaaaa'})
      .set(tokenValido)
      .then(res => {
      expect(res.statusCode).toEqual(404)
    }).catch(error => {fail(error)})
  })

  test("Deve impedir o login com uma senha errada", () => {
    return request.post('/auth')
      .send({email:user.email, password:'....'})
      .set(tokenValido)
      .then(res => {
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
      expect(res.body.length).toBeGreaterThan(0)
    }).catch(error => fail(error))
  })
})
