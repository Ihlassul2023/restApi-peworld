const express = require('express')
const app = express()
const authUser = require('./src/router/authRouter')
const company = require('./src/router//companyRouter')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ info: 'HireJob API v.1.0.0' })
})

app.use(authUser)
app.use(company)

app.listen(4000, ()=>{
    console.log(`App running on http://localhost:4000`)
})