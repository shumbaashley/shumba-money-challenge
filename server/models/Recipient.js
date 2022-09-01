const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema(
  {
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
    emailAddress: {
      type: String,
      required: false,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please provide city"],
      trim: true,
    },
    countryOfResidence: {
      type: String,
      enum: {
        values: ["Botswana", "Zimbabwe", "United Kingdom", "South Africa"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide country of residence"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide customer"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipient", RecipientSchema);
