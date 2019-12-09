const express = require("express");
const router = express.Router();

//@route  GET  api/contacts
//@desc   get all users contacts
//@access   Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

//@route  POST  api/contacts
//@desc   add a new contact
//@access   Private
router.post("/", (req, res) => {
  res.send("Add a contact");
});

//@route  PUT  api/contacts/:id
//@desc   Update a  contacts
//@access   Private
router.put("/:id", (req, res) => {
  res.send("Update a contact");
});

//@route  DELETE  api/contacts/:id
//@desc   Delete a contacts
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
