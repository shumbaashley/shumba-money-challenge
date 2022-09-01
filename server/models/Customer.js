const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
  },
  countryOfResidence: {
    type: String,
    enum: {
      values: ["Australia", "Canada", "United Kingdom", "Botswana"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Please provide country of residence"],
    trim: true,
  },
  emailAddress: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

CustomerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

CustomerSchema.methods.createJWT = function () {
  return jwt.sign(
    { customerId: this._id, firstName: this.firstName, lastName: this.lastName, emailAddress: this.emailAddress, countryOfResidence: this.countryOfResidence},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

CustomerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('Customer', CustomerSchema)
