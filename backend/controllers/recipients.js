const Recipient = require('../models/Recipient')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllRecipients = asyncWrapper(async (req, res) => {
  const recipients = await Recipient.find({})
  res.status(200).json({ recipients })
})

const createRecipient = asyncWrapper(async (req, res) => {
  const recipient = await Recipient.create(req.body)
  res.status(201).json({ recipient })
})

const getRecipient = asyncWrapper(async (req, res, next) => {
  const { id: recipientID } = req.params
  const recipient = await Recipient.findOne({ _id: recipientID })
  if (!recipient) {
    return next(createCustomError(`No recipient with id : ${recipientID}`, 404))
  }

  res.status(200).json({ recipient })
})

const deleteRecipient = asyncWrapper(async (req, res, next) => {
  const { id: recipientID } = req.params
  const recipient = await Recipient.findOneAndDelete({ _id: recipientID })
  if (!recipient) {
    return next(createCustomError(`No recipient with id : ${recipientID}`, 404))
  }
  res.status(200).json({ recipient })
})

const updateRecipient = asyncWrapper(async (req, res, next) => {
  const { id: recipientID } = req.params

  const recipient = await Recipient.findOneAndUpdate({ _id: recipientID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!recipient) {
    return next(createCustomError(`No recipient with id : ${recipientID}`, 404))
  }

  res.status(200).json({ recipient })
})

module.exports = {
  getAllRecipients,
  createRecipient,
  getRecipient,
  updateRecipient,
  deleteRecipient,
}