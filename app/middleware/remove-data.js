const deleteDataSet = require('./helpers/remove-data/delete-data-set')

const removeData = () => {
  return async function (req, res, next) {
    try {
      await deleteDataSet()
    } catch (error) {
      next(error)
    }
    next()
  }
}

module.exports = removeData
