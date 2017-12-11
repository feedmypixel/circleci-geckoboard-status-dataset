const config = require('../../../config')

const geckoBoard = require('geckoboard')(config.geckoBoardAPIKey)

const deleteDataSet = () => {
  return new Promise((resolve, reject) => {
    geckoBoard.datasets.delete('circle_ci.data_hub', (error) => {
      if (error) {
        return reject(error)
      }

      return resolve()
    })
  })
}

module.exports = deleteDataSet
