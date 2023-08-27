const express = require('express')
const app = express()
const port = 3000

const patientApi=require('./routes/patientApi')
const doctorApi=require('./routes/doctorApi')
const labApi=require('./routes/labApi')

app.use(express.json())

// Routes
app.use('/patient',patientApi);
app.use('/doctor',doctorApi);
app.use('/lab',labApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})