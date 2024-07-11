'use strict'

const { model, Schema } = require('mongoose');
const { generateSlug, ensureUniqueSlug } = require('../utils/slugUtils');

const DOCUMENT_NAME = "PostVersion";
const COLLECTION_NAME = "PostVersions";


const postVersionSchema = new Schema({
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    title: String,
    content: String,
    author: String,
    versionNumber: Number,
  },
  {
      timestamps: true,
      collection: COLLECTION_NAME
  });

  postVersionSchema.pre('save', async function(next) {
    if (this.isModified('title')) {
      const baseSlug = generateSlug(this.title);
      this.slug = await ensureUniqueSlug(this.constructor, baseSlug, this._id);
    }
    next();
  });
  
  module.exports = model( DOCUMENT_NAME, postVersionSchema);