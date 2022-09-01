const Recipient = require('../models/Recipient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllRecipients = async (req, res) => {
  const recipients = await Recipient.find({ createdBy: req.customer.customerId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ recipients, count: recipients.length })
}

const getRecipient = async (req, res) => {
  const {
    customer: { customerId },
    params: { id: recipientId },
  } = req

  const recipient = await Recipient.findOne({
    _id: recipientId,
    createdBy: customerId,
  })
  if (!recipient) {
    throw new NotFoundError(`No recipient with id ${recipientId}`)
  }
  res.status(StatusCodes.OK).json({ recipient })
}

const createRecipient = async (req, res) => {
  req.body.createdBy = req.customer.customerId
  const recipient = await Recipient.create(req.body)
  res.status(StatusCodes.CREATED).json({ recipient })
}

const updateRecipient = async (req, res) => {
  const {
    body: { company, position },
    customer: { customerId },
    params: { id: recipientId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const recipient = await Recipient.findByIdAndUpdate(
    { _id: recipientId, createdBy: customerId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!recipient) {
    throw new NotFoundError(`No recipient with id ${recipientId}`)
  }
  res.status(StatusCodes.OK).json({ recipient })
}

const deleteRecipient = async (req, res) => {
  const {
    customer: { customerId },
    params: { id: recipientId },
  } = req

  const recipient = await Recipient.findByIdAndRemove({
    _id: recipientId,
    createdBy: customerId,
  })
  if (!recipient) {
    throw new NotFoundError(`No recipient with id ${recipientId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createRecipient,
  deleteRecipient,
  getAllRecipients,
  updateRecipient,
  getRecipient,
}
