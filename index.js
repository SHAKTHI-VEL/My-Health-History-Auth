const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000 || process.env.port

const patientApi=require('./routes/patientApi')
const doctorApi=require('./routes/doctorApi')
const labApi=require('./routes/labApi')

app.use(express.json())
app.use(cors())

// Routes
app.use('/patient',patientApi);
app.use('/doctor',doctorApi);
app.use('/lab',labApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})