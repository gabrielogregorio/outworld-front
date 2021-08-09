let {app, mongoose}  = require('../src/app');
let supertest = require('supertest');
let request = supertest(app)

afterAll(() => {
  mongoose.connection.close()
})

describe('Testes de aplicação', () => {
  it("A aplicação deve responder na porta 3333", () => {
    return request.get('/test')
      .then(res => { expect(res.statusCode).toEqual(200)})
      .catch(error => {fail(error)})
  })  
})


