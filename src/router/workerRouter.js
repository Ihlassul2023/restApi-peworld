const {registerWorker, getWorker, loginWorker, editWorker} = require('../controller/workerController')
const app = require('express')
const router = app.Router()
const upload = require('../middleware/multer')
const {protect} = require('../middleware/jwt')

router.get('/list-worker', protect, getWorker)
router.post('/register-worker', upload.single('photo'), registerWorker)
router.post('/login-worker', loginWorker)
router.put('/update-worker/:id', protect, upload.single('photo'), editWorker)

module.exports = router