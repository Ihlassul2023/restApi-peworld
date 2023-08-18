const express = require('express')
const app = express()
const company = require('./src/router/companyRouter')
const worker = require('./src/router/workerRouter')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ info: 'HireJob API v.1.0.0', Group: 3,  Member: ['Ihlas Sul Akbar', 'Muhammad Faisal', 'Farhan Rizki', 'Mohamad Yasin Fadilah', 'Mahardhika Putra Pratama']})
})

app.use(company)
app.use(worker)

app.listen(4000, ()=>{
    console.log(`App running on http://localhost:4000`)
})