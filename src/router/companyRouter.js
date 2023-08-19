const {registerCompany, getCompany, loginCompany, editCompany, deleteAccount} = require('../controller/companyController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')
const {protect} = require('../middleware/jwt')

router.get('/list-company', protect, getCompany)
router.post('/register-company', upload.single('photo'), registerCompany)
router.post('/login-company', loginCompany)
router.put('/update-company', protect, upload.single('photo'), editCompany)
router.delete('/delete-company', protect, deleteAccount)

module.exports = router