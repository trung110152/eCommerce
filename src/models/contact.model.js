'use strict'

const { model, Schema } = require('mongoose'); 

const DOCUMENT_NAME = "Contact";
const COLLECTION_NAME = "Contacts";
 
const contactSchema = new Schema({
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
module.exports = model(DOCUMENT_NAME, contactSchema);