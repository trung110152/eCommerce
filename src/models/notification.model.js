'use strict'

const { model, Schema } = require('mongoose'); 

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";
 
const notificationSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String 
    },
    message: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, notificationSchema);