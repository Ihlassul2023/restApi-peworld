const {registerUser, getUser} = require('../controller/authController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')

router.get('/user', getUser)
router.post('/register-user', upload.single('photo'), registerUser)

module.exports = router