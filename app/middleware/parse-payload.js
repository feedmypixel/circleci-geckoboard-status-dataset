const { get, set, pick, includes } = require('lodash')

const parsePayload = (reportForBranches = [ 'master', 'develop' ]) => {
  return function (req, res, next) {
    const payload = get(req, 'body.payload')
    const branch = get(payload, 'branch')

    if (includes(reportForBranches, branch)) {
      set(res, 'locals.data', pick(payload, [
        'failed',
        'author_name',
        'branch'
      ]))
    }
    next()
  }
}

module.exports = parsePayload
