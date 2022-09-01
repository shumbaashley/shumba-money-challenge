const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "must provide first name"],
      trim: true,
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "must provide last name"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "must provide phone number"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "must provide city"],
      trim: true,
    },
    countryOfResidence: {
      type: String,
      enum: {
        values: ["Botswana", "Zimbabwe", "United Kingdom", "South Africa"],
        message: "{VALUE} is not supported",
      },
      required: [true, "must provide country Of residence"],
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
