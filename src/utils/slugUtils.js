const slugify = require('slugify');

function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'vi'
  });
}

async function ensureUniqueSlug(model, slug, documentId = null) {
  const slugRegEx = new RegExp(`^(${slug})((-[0-9]*$)?)$`, 'i');
  const documentsWithSlug = await model.find({ 
    slug: slugRegEx,
    _id: { $ne: documentId } // Loại trừ document hiện tại khi cập nhật
  });
  
  if (documentsWithSlug.length > 0) {
    return `${slug}-${documentsWithSlug.length + 1}`;
  }
  
  return slug;
}

module.exports = { generateSlug, ensureUniqueSlug };