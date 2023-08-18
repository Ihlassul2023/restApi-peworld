const {registerCompany, getCompany, loginCompany, editCompany} = require('../controller/authCompanyController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')
const {protect} = require('../middleware/jwt')

router.get('/list-company', protect, getCompany)
router.post('/register-company', upload.single('photo'), registerCompany)
router.post('/login-company', loginCompany)
router.put('/update-company/:id', protect, upload.single('photo'), editCompany)

module.exports = router