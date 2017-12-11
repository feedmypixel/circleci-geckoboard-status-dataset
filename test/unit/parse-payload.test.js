const { get, assign, pick } = require('lodash')

const parsePayload = require('../../app/middleware/parse-payload')
const mockPayload = require('./data/mock-payload')
const mockPayloadMasterBranch = require('./data/mock-payload-master-branch')
const dataSetItems = [
  'failed',
  'author_name',
  'branch'
]

describe('#parsePayload', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.responseMock = {}
    this.branches = [get(mockPayload, 'payload.branch')]
  })

  test('middleware should call next when branch does not match', () => {
    parsePayload()({ body: mockPayload }, this.responseMock, this.nextMock)

    expect(this.nextMock.mock.calls.length).toBe(1)
  })

  test('middleware should call not parse payload when branch does not match', () => {
    parsePayload()({ body: mockPayload }, this.responseMock, this.nextMock)

    expect(this.responseMock).toEqual({})
  })

  test('middleware should call next when default branch matches', () => {
    parsePayload()({ body: mockPayloadMasterBranch }, this.responseMock, this.nextMock)

    expect(this.nextMock.mock.calls.length).toBe(1)
  })

  test('middleware should parse payload when default branch matches', () => {
    const expectedData = assign({}, pick(get(mockPayloadMasterBranch, 'payload'), dataSetItems))

    parsePayload()({ body: mockPayloadMasterBranch }, this.responseMock, this.nextMock)

    expect(this.responseMock).toEqual({
      locals: {
        data: expectedData
      }
    })
  })

  test('middleware should call next with matching branch arguments', () => {
    parsePayload(this.branches)({ body: mockPayload }, this.responseMock, this.nextMock)

    expect(this.nextMock.mock.calls.length).toBe(1)
  })

  test('middleware should parse payload with matching branch arguments', () => {
    const expectedData = assign({}, pick(get(mockPayload, 'payload'), dataSetItems))

    parsePayload(this.branches)({ body: mockPayload }, this.responseMock, this.nextMock)

    expect(this.responseMock).toEqual({
      locals: {
        data: expectedData
      }
    })
  })
})
