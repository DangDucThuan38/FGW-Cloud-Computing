const mongoose = require('mongoose')

var BoySchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    made: String,
    image: String,
    date: Date,
    brand:String,
    status: Number,
    material: String,
    image2: String,
    image3: String,
    code:String,
    age:String,
    color:String
   
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var BoyModel = mongoose.model('boy', BoySchema, 'boy');
module.exports = BoyModel