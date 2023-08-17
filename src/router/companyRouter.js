const {getProfile, postProfile, updateProfile, getCompanyId} = require('../controller/companyController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')
const { protect } = require('../middleware/jwt')

router.get('/company', getProfile)
router.get('/company/:id', getCompanyId)
router.post('/company', protect, postProfile)
router.put('/company/:id', protect, updateProfile)

module.exports = router