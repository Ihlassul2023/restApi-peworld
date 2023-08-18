const { getData, getSkillById, postData, putData, deleteDataById } = require("../controller/skillController")
const express = require('express')
const router = express.Router()


router.get('/', getData)
router.get('/:id', getSkillById)
router.post('/', postData)
router.put('/:id', putData)
router.delete('/:user_id', deleteDataById)

module.exports = router;