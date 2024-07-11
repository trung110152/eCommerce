'use strict'

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "Categories";
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
},
  {
      timestamps: true,
      collection: COLLECTION_NAME
});


// Hàm tạo slug
function generateSlug(name) {
    return slugify(name, {
      lower: true,     // chuyển thành chữ thường
      strict: true     // loại bỏ các ký tự đặc biệt
    });
}

// Middleware để tự động tạo slug trước khi lưu
categorySchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
      return next();
    }
    
    this.slug = generateSlug(this.name);
    
    // Kiểm tra xem slug đã tồn tại chưa
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const categoriesWithSlug = await this.constructor.find({ slug: slugRegEx });
    
    if (categoriesWithSlug.length) {
      this.slug = `${this.slug}-${categoriesWithSlug.length + 1}`;
    }
    
    next();
});

module.exports = model( DOCUMENT_NAME, categorySchema);