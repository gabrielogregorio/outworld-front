// Retorna o token JWT de um usuário
function getHeader() {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    }
  }
}

module.exports = getHeader;
