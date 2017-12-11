const { get } = require('lodash')

const schema = require('./helpers/send-data/schema')
const transformer = require('./helpers/send-data/transformer')
const findOrCreate = require('./helpers/send-data/find-or-create')
const postDataSet = require('./helpers/send-data/post-data-set')

const sendData = () => {
  return async function (req, res, next) {
    const circleCiData = get(res, 'locals.data')

    if (circleCiData) {
      try {
        const dataSet = await findOrCreate(schema())
        await postDataSet(dataSet, [transformer(circleCiData)])
      } catch (error) {
        return next(error)
      }
    }

    next()
  }
}

module.exports = sendData
