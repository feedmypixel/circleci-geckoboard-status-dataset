const { teamName } = require('../../../config')

const ID = 'circle_ci'

const schema = () => {
  return {
    id: `${ID}.${teamName}`,
    unique_by: ['branch'],
    fields: {
      status: {
        type: 'string',
        name: 'Status'
      },
      developer: {
        type: 'string',
        name: 'Last merge by'
      },
      branch: {
        type: 'string',
        name: 'Branch'
      }
    }
  }
}

module.exports = schema
