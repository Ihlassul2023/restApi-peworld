const {registerUser, getUser, login, editUser} = require('../controller/authController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')
const {protect} = require('../middleware/jwt')

router.get('/user', protect, getUser)
router.post('/register', upload.single('photo'), registerUser)
router.post('/login', login)
router.put('/user/:id', protect, upload.single('photo'), editUser)

module.exports = router