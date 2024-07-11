const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contact.controller');
const { asyncHandler } = require('../../auth/checkAuth');

router.post('/', asyncHandler(contactController.createContact));

// router.get('/', ContactController.getAllContacts);
// router.get('/:id', ContactController.getContactById);

module.exports = router;