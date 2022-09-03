const mongoose = require("mongoose");
const Customer = require("./models/Customer");

const connectDB = require("./db/connect");

const testCustomers = [
  {
    firstName: "Jane",
    middleName: "",
    lastName: "Doe",
    phoneNumber: "",
    emailAddress: "text@king.com",
    password: "1234lion",
    countryOfResidence: "United Kingdom",
  },
];

const seedDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log("Connection open")
    );
    await Customer.deleteMany({});
    await Customer.insertMany(testCustomers);
  } catch (error) {
    console.log(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
