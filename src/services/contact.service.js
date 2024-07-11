'use strict'
const Contact = require('../models/contact.model');

class ContactService {
    static createContact= async (contactData) => {
        const newContact = await Contact.create(contactData);
        if (newContact) {
            return newContact;
        }
        return {
            code: 200,
            metadata: null
        };
    }
}

module.exports = ContactService;