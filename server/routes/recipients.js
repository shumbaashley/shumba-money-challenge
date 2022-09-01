const express = require("express");

const router = express.Router();
const {
  createRecipient,
  deleteRecipient,
  getAllRecipients,
  updateRecipient,
  getRecipient,
} = require("../controllers/recipients");

router.route("/").post(createRecipient).get(getAllRecipients);

router
  .route("/:id")
  .get(getRecipient)
  .delete(deleteRecipient)
  .patch(updateRecipient);

module.exports = router;
