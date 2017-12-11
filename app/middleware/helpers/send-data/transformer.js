/* eslint-disable camelcase */
const transformer = ({
  failed,
  author_name,
  branch
}) => {
  return {
    status: failed ? 'FAILED' : 'OK',
    developer: author_name,
    branch
  }
}

module.exports = transformer
