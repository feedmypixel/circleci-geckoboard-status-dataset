const putDataSet = (dataSet, data) => {
  return new Promise((resolve, reject) => {
    dataSet.post(data, {}, (error) => {
      if (error) {
        return reject(error)
      }

      return resolve()
    })
  })
}

module.exports = putDataSet
