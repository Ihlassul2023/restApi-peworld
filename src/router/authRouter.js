const {registerUser, getUser} = require('../controller/authController')
const app = require('express')
const router = app.Router()

router.get('/user', getUser)
router.post('/register-user', registerUser)

module.exports = router