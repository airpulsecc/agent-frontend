const tokenName = 'authToken'

class Token {
  getToken() {
    return window.localStorage.getItem(tokenName)
  }
  setToken(token: string) {
    localStorage.setItem(tokenName, token)
  }
  clearToken() {
    window.localStorage.removeItem(tokenName)
  }
  getHeaderString() {
    const token = this.getToken()
    if (token) {
      return `Bearer ${token}`
    }
    return ''
  }
}

const token = new Token()

export { token }
