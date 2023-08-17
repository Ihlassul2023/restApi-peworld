const {getProfile, postProfile} = require('../controller/companyController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')

router.get('/profile-company', getProfile)
router.post('/post-company', postProfile)

module.exports = router