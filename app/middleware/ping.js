const config = require('../config')

const geckoBoard = require('geckoboard')(config.geckoBoardAPIKey)

const pingGeckoBoard = () => {
  return function (req, res, next) {
    geckoBoard.ping((err) => {
      if (err) {
        return next(err)
      }

      return res.send('Authentication successful')
    })
  }
}

module.exports = pingGeckoBoard
