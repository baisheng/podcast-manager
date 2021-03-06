const isProdMode = Object.is(process.env.NODE_ENV, 'production')
module.exports = {
  baseURL: isProdMode ? 'https://api.caixie.top/v1' : 'http://127.0.0.1:5000',
  socketHost: isProdMode ? 'https://caixie.top' : 'http://localhost:5000'
}
