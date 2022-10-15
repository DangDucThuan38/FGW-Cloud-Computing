const mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    made: String,
    image: String,
    date: Date,
    status: Number,
    material: String,
    image2: String,
    image3: String
   
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var ProductModel = mongoose.model('product', ProductSchema, 'product');
module.exports = ProductModel