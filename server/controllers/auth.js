const Customer = require('../models/Customer')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  console.log({...req.body});
  const customer = await Customer.create({ ...req.body })
  const token = customer.createJWT()
  res.status(StatusCodes.CREATED).json({ customer: { firstName: customer.firstName }, token })
}

const login = async (req, res) => {
  const { emailAddress, password } = req.body

  if (!emailAddress || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const customer = await Customer.findOne({ emailAddress })
  if (!customer) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await customer.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = customer.createJWT()
  res.status(StatusCodes.OK).json({ customer: { firstName: customer.firstName }, token })
}

module.exports = {
  register,
  login,
}
