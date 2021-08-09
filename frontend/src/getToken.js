function getHeader() {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')
    }
  }
  
}


module.exports = getHeader;