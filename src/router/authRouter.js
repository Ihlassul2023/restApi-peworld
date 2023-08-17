const {registerUser} = require('../controller/authController')
const app = require('express')
const router = app.Router()

router.post('/register-user', registerUser)

module.exports = router