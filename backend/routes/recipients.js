const express = require('express')
const router = express.Router()

const {
  getAllRecipients,
  createRecipient,
  getRecipient,
  updateRecipient,
  deleteRecipient,
  editRecipient,
} = require('../controllers/recipients')

router.route('/').get(getAllRecipients).post(createRecipient)
router.route('/:id').get(getRecipient).patch(updateRecipient).delete(deleteRecipient)

module.exports = router