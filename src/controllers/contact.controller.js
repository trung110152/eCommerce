'use strict'
const ContactService = require('../services/contact.service');
const NotificationService = require('../services/notification.service');
const { CREATED } = require("../core/success.response");

class ContactController {
  
    createContact = async(req, res, next ) => {
            const newContact = await ContactService.createContact(req.body);
            
            // Thêm thông báo mới
            await NotificationService.addNotification({
                message: 'New Contact!',
                contact: {
                    name: newContact.name,
                    email: newContact.email,
                    phone: newContact.phone,
                }
            });
            
            new CREATED({
                message: 'INFORMATION RECORDED',
                metadata: newContact
            }).send(res)
    }
}


module.exports = new ContactController();