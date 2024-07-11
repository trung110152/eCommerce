'use strict'

const { model, Schema} = require('mongoose');
const { generateSlug, ensureUniqueSlug } = require('../utils/slugUtils');


const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";
const postSchema = new Schema({
  title: String,
  content: String,
  author: String,
  type: {
    type: String,
    enum: ['news', 'blog', 'product', 'event'],
    required: true
  },
  tags: [String],
  currentVersion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostVersion'
  },
  versions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostVersion'
  }],
},
{
    timestamps: true,
    collection: COLLECTION_NAME
});

postSchema.pre('save', async function(next) {
    if (this.isModified('title')) {
      const baseSlug = generateSlug(this.title);
      this.slug = await ensureUniqueSlug(this.constructor, baseSlug, this._id);
    }
    next();
  });
  


module.exports = model(DOCUMENT_NAME, postSchema);