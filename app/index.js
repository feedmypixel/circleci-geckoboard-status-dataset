const express = require('express')
const morgan = require('morgan')

const { port } = require('./config')
const removeData = require('./middleware/remove-data')
const parsePayload = require('./middleware/parse-payload')
const sendData = require('./middleware/send-data')
const ping = require('./middleware/ping')
const catchAllErrors = require('./middleware/catch-all-errors')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/ping', ping())
app.get('/remove', removeData(), (req, res) => res.redirect('/remove/success'))
app.get('/remove/success', (req, res) => res.send('Data deleted'))
app.post('/send-data', parsePayload(), sendData(), (req, res) => res.redirect('/send-data/success'))
app.get('/send-data/success', (req, res) => res.send('Data added'))
app.use(catchAllErrors())

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

module.exports = app
