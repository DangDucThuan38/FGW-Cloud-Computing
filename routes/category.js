const express = require('express')
const CategoryModel = require('../models/CategoryModels')
const router = express.Router()


router.get('/', (req, res) => {
  CategoryModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/category
      res.render('category/index', { category: data })
    }
  })
})
router.get('/manage', (req, res) => {
  CategoryModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/category
      res.render('category/manage', { category: data })
    }
  })
})



router.get("/detail/:id", (req, res) => {
  //lấy giá trị id của document gửi từ url
  var category_id = req.params.id;
  //tìm kiếm document trong collection theo id
  CategoryModel.findById(category_id, (err, data) => {
    if (!err) {
      //render ra file detail chứa dữ liệu của document
      res.render("category/detail", { category: data });
    }
  });
});

//-----ADD PRODUCT
router.get("/add", (req, res) => {
  res.render("category/add");
});

router.post("/add", (req, res) => {
  var category = new CategoryModel(req.body);
  category.save((err) => {
    if (!err) {
      res.redirect("/category");
    }
  });
});

//----EDIT PRODUCT----
router.get("/edit/:id", (req, res) => {
  CategoryModel.findById(req.params.id, (err, data) => {
    if (!err) {
       res.render("category/edit", { category: data })
    }
  })
})

router.post("/edit/:id", (req, res) => {
   CategoryModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
     if (!err) {
       console.log("Edit product succeed !")
       res.redirect("/category")
     }
   })
})
//------DElete
router.get("/delete/:id", (req, res)=>{
    CategoryModel.findByIdAndDelete(req.params.id, (err)=>{
        if(!err){
            console.log("Delete Success");
            res.redirect("/category");
        }
    } );
});

//----- Search
 router.post("/search", (req, res) => {
    CategoryModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
        res.render("category/manage", { category: data });
      }
    });
  });



module.exports = router