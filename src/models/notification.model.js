'use strict'

const { model, Schema } = require('mongoose'); 

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";
 
const notificationSchema = new Schema({
    type: { 
        type: String, 
        default: '0' 
    },
    content: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, notificationSchema);