let {app, mongoose} = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)
let userAny = {name: 'userTest', email: 'user@teste.com', password: 'adminPassword'}
let post = {title: 'Estação espacial', body: 'Um body qualquer', test: true}
var idPostValido = "";
var tokenValido = {}
var idComentarioValido = "";
var tokenOutroUsuario = { authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4IiwibmFtZSI6ImdhYnJpZWwiLCJpZCI6IjYxMTFhZmUwZTk2YzU5NTU5MDk3NDU4MiIsImlhdCI6MTYyODU0OTEwMiwiZXhwIjoxNjI4NjM1NTAyfQ.KoZ-9kARvyhptMKAtTzdiH_mlrzo8RTiNuGS2_daJG0"}
require('dotenv/config')
 
var user = {
  name: process.env.TEST_USER_NAME,
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
  id: '' 
}

beforeAll(() => {
  return request.post('/configure')
    .then(res => { user.id = res.id })
    .catch(error => fail(error))
})

afterAll(() => {
  // Finalização da suite
  return request.delete(`/user/${userAny.email}`).then(res => {
    return request.delete(`/image`).then(() => {
      return request.post('/endconfigure').then(() => {
        return mongoose.connection.close();
       })      
    })
  })
})

describe("Login no sistema", () => {
  test("Deve acessar o sistema e fornecer um token válido para os outros testes", () => {
    return request.post('/auth')
      .send({email: user.email, password: user.password})
      .then(res => {
        tokenValido = { authorization:"Bearer " + res.body.token}
        userIdValido = res.body.id;
      }).catch(error => {
        fail(error)
      })
  })
})

describe('Gerenciamento de posts', () => {
  test("Deve cadastrar um post", () => {
    return request.post('/post')
      .send(post)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        idPostValido = res.body._id
    }).catch(error => {fail(error)})
  })

  test("Deve retornar uma lista com todos os usuários e suas imagens", () => {
    return request.get('/posts')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].body).toBeDefined()
    }).catch(error => fail(error))
  })
  
  test("Deve retornar um post", () => {
    return request.get(`/post/${idPostValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].user.name).toBeDefined()
        expect(res.body[0].body).toBeDefined()
    }).catch(error => fail(error))
  })

  test("Deve retornar erro 500 para um parametro invalido", () => {
    return request.get('/post/aaa')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(500)
    }).catch(error => fail(error))
  })

  test("Deve retornar erro 404 ao não encontrar o post", () => {
    return request.get('/post/111111111111111111111111')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(404)
    }).catch(error => fail(error))
  })

  test("Deve retornar erro 400 ao tentar editar um post passando parametros incorretos", () => {
    return request.put(`/post/${idPostValido}`, {})
      .set(tokenValido)
      .send({title: ''})
      .then(res => {
        expect(res.statusCode).toEqual(400)
    }).catch(error => fail(error))
  })
  
  test("Deve permitir a edição de um post!", () => {
    return request.put(`/post/${idPostValido}`)
      .set(tokenValido)
      .send({title: 'test1z', body: 'test1z'})
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('test1z')
    }).catch(error => fail(error))
  })

  test("Não deve permitir a edição de um post por um usuário que não o postou", () => {
    return request.put(`/post/${idPostValido}`)
      .set(tokenOutroUsuario)
      .send({title: 'test1z', body: 'test1z'})
      .then(res => {
        expect(res.statusCode).toEqual(403)
    }).catch(error => fail(error))
  })

  test("Deve enviar um like", () => {
    return request.post(`/post/like/${idPostValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.includeLike).toEqual(true)
    }).catch(error => fail(error))
  })

  test("Deve desfazer um like", () => {
    return request.post(`/post/like/${idPostValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.includeLike).toEqual(false)
    }).catch(error => fail(error))
  })

  test("Deve retornar 500 quando um post inválido for enviado", () => {
    return request.post(`/post/like/11111111`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(500)
    }).catch(error => fail(error))
  })



  test("Deve retornar 400 com um comentário sem texto", () => {
    return request.post(`/post/comment/${idPostValido}`)
    .send({text: ''})
    .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(400)
    }).catch(error => fail(error))
  })

  test("Deve retornar 500 quando um comentário inválido for enviado", () => {
    return request.post(`/post/comment/11111111`)
      .set(tokenValido)
      .send({text: 'Isso é um comentario'})
      .then(res => {
        expect(res.statusCode).toEqual(500)
    }).catch(error => fail(error))
  })

  test("Deve enviar um comentario", () => {
    return request.post(`/post/comment/${idPostValido}`)
      .set(tokenValido)
      .send({text: 'Isso é um comentario'})
      .then(res => {
        idComentarioValido = res.body.id;
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toBeDefined()
    }).catch(error => fail(error))
  })
  test("Deve Editar um comentario", () => {
    return request.put(`/post/comment/${idComentarioValido}`)
      .set(tokenValido)
      .send({text: 'Novo texto do comentário'})
      .then(res => {
        expect(res.statusCode).toEqual(200)
    }).catch(error => fail(error))
  })

  test("Deve retornar 404 para um comentário não encontrado", () => {
    return request.put(`/post/comment/61151403a98cbbc6de55a204`)
      .set(tokenValido)
      .send({text: 'Novo texto do comentário'})
      .then(res => {
        expect(res.statusCode).toEqual(404)
    }).catch(error => fail(error))
  })
  test("Deve desfazer um comentário", () => {
    return request.delete(`/post/comment/${idComentarioValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
    }).catch(error => fail(error))
  })




  test("Obter os dados de si mesmo", () => {
    return request.get('/myPosts')
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].title).toBeDefined()
        expect(res.body[0].body).toBeDefined()

    }).catch(error => fail(error))
  })

  test("Deve Deletar um post!", () => {
    return request.delete(`/post/${idPostValido}`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(200)
    }).catch(error => fail(error))
  })

  test("Deve retornar 404 ao tentar deletar um post que não existe", () => {
    return request.delete(`/post/111111111111111111111111`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(404)
    }).catch(error => fail(error))
  })

  test("Deve retornar 500 ao passar um parametro invalido", () => {
    return request.delete(`/post/111`)
      .set(tokenValido)
      .then(res => {
        expect(res.statusCode).toEqual(500)
    }).catch(error => fail(error))
  })
})
