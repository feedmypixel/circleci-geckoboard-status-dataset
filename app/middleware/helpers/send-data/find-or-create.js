const config = require('../../../config')

const geckoBoard = require('geckoboard')(config.geckoBoardAPIKey)

const findOrCreate = (schema) => {
  return new Promise((resolve, reject) => {
    geckoBoard.datasets.findOrCreate(schema, (error, dataSet) => {
      if (error) {
        return reject(error)
      }

      return resolve(dataSet)
    })
  })
}

module.exports = findOrCreate
