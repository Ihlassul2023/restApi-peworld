const {getProfile, postProfile, updateProfile, getWorkerId} = require('../controller/workerController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')
const { protect } = require('../middleware/jwt')

router.get('/worker', getProfile)
router.get('/worker/:id', getWorkerId)
router.post('/worker', protect, postProfile)
router.put('/worker/:id', protect, updateProfile)

module.exports = router