let {app, mongoose}  = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
var tokenValido = {}
var idUsuarioValido = '';
var token2Valido = {}
var idUsuario2Valido = '';

let user = {
  name:'sherek',
  username:'sherek',
  email:'no-valid-email',
  itemBio: [
    ['school', 'Graduou em análise e desenvolvimento de Sistemas na Fatec Araçatuba'],
    ['status', 'Solteiro'],
    ['work', 'Desenvolvedor web'],
    ['film', 'Interestelar']
  ],
  bio: 'Lucas 🌻\n🏠 \n⏳ 23\n♍ testetesttesttestestes',
  motivational: 'Loremmmmmmm snsadnadlaldjsaddssasdaad',
  password: 'asdmkaksasdas'
}

let user2 = {
  name:'9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c',
  username:'9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c',
  email:'9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c',
  itemBio: [
    ['school', '9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c'],
    ['status', '9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c'],
    ['work', '9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c'],
    ['film', '9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c']
  ],
  bio: '🌻🏠\n\n@9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c',
  motivational: '9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c',
  password: '9d591724044b57d9b3607bbef285cbb9086b53edaf1cd1cedb47e6ad6855721c'
}

beforeAll(() => {
  return request.post('/configure').then(() => {}).catch(error => fail(error))
})
// Upload de imagens não está incluso nos testes

afterAll(() => {
  return request.delete(`/user/${user.email}`).then(res => {
    return request.delete(`/user/${user2.email}`).then(res => {
      return request.post('/endconfigure').then(() => {
        return mongoose.connection.close();
      })
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

  test("Deve cadastrar um segundo usuário com sucesso!", () => {
    return request.post('/user').send(user2).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.email).toEqual(user2.email)
      expect(res.body.id).toBeDefined()
      expect(res.body.token).toBeDefined()
      idUsuario2Valido = res.body.id;
      token2Valido = { authorization:"Bearer " + res.body.token}
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
})


describe("Testes gerais", () => {
  test("Deve retornar um Usuário", () => {
    return request.get(`/user/${idUsuarioValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toBeDefined()
        expect(res.body[0].email).toBeDefined()
        expect(res.body[0].username).toBeDefined()
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

  test('Usuário 1 deve seguir o usuário 2', () => {
    return request.post(`/user/follow/${idUsuario2Valido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.followed).toEqual(true)
    }).catch(error => fail(error))
  })

  test("Obter os dados de si mesmo e verificar que está seguindo o usuario 2", () => {
    return request.get('/me')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toEqual(user.name)
        expect(res.body[0].email).toEqual(user.email)
        expect(res.body[0].username).toEqual(user.username)
        expect(res.body[0].following[0]._id).toEqual(idUsuario2Valido)
    }).catch(error => fail(error))
  })

  test("Obter os dados de si mesmo e verificar que está sendo seguido pelo usuario 1", () => {
    return request.get('/me')
      .set(token2Valido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toEqual(user2.name)
        expect(res.body[0].email).toEqual(user2.email)
        expect(res.body[0].username).toEqual(user2.username)
        expect(res.body[0].followers[0]._id).toEqual(idUsuarioValido)
    }).catch(error => fail(error))
  })

  test('Usuário 1 deve remover o seguir do usuário 2', () => {
    return request.post(`/user/follow/${idUsuario2Valido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.followed).toEqual(false)
    }).catch(error => fail(error))
  })

  test("Obter os dados de si mesmo e verificar que DEIXOU de seguir o usuario 2", () => {
    return request.get('/me')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toEqual(user.name)
        expect(res.body[0].email).toEqual(user.email)
        expect(res.body[0].username).toEqual(user.username)
        expect(res.body[0].following).toEqual([])
    }).catch(error => fail(error))
  })

  test("Obter os dados de si mesmo e verificar que DEIXOU de ser seguido pelo usuario 1", () => {
    return request.get('/me')
      .set(token2Valido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toEqual(user2.name)
        expect(res.body[0].email).toEqual(user2.email)
        expect(res.body[0].username).toEqual(user2.username)
        expect(res.body[0].followers).toEqual([])
    }).catch(error => fail(error))
  })

  test('Usuário não pode seguir a si mesmo', () => {
    return request.post(`/user/follow/${idUsuarioValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(400)
        expect(res.body.msg).toEqual('Usuário não pode seguir a si mesmo!')
    }).catch(error => fail(error))
  })

  test('Impedir acesso com token invalido', () => {
    return request.post('/validate').send().set(
      { authorization:"Bearer aaaaaaaaaaaaaaaaa"}
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
      .send(
        {
          name: 'alterado',
          password: 'gabriel',
          username:'alterado2',
          itemBio: user.itemBio,
          bio: user.bio,
          motivational: user.motivational
        })
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual('alterado')
        expect(res.body.bio).toEqual(user.bio)
        expect(res.body.motivational).toEqual(user.motivational)
        expect(res.body.itemBio[0].text).toEqual(user.itemBio[0][1])
    }).catch(error => fail(error))
  })

  test("Deve permitir a edição de um usuario novamente!", () => {
    return request.put(`/user/${idUsuarioValido}`)
      .set(tokenValido)
      .send({name: user.name, password: user.password, username:user.username})
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(user.name)
    }).catch(error => fail(error))
  })

  test("Deve impedir um usuário editar outro!", () => {
    return request.put(`/user/9999999999999999999999999`)
      .set(tokenValido)
      .send({name: 'alterado', password: 'alterado', username:'teste2'})
      .then(res => {
        expect(res.statusCode).toEqual(403)
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

  test("Deve retornar uma lista de usuários", () => {
    return request.get('/users')
    .set(tokenValido)
    .then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBeGreaterThan(0)
    }).catch(error => fail(error))
  })
})
