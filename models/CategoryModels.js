const mongoose = require('mongoose')

var CategorySchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    describe:String,
    toy:String

   
   
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var CategoryModel = mongoose.model('category', CategorySchema, 'category');
module.exports = CategoryModel