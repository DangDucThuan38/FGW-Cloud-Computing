const express = require('express')
const ProductModel = require('../models/ProductModel')
const router = express.Router()


router.get('/', (req, res) => {
  ProductModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      res.render('index', { product: data })
    }
  })
})

router.get('/product', (req, res) => {
  ProductModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/student
      res.render('product/index', { product: data })
    }
  })
})

router.get("/detail/:id", (req, res) => {
  //lấy giá trị id của document gửi từ url
  var product_id = req.params.id;
  //tìm kiếm document trong collection theo id
  ProductModel.findById(product_id, (err, data) => {
    if (!err) {
      //render ra file detail chứa dữ liệu của document
      res.render("product/detail", { product: data });
    }
  });
});

//-----ADD PRODUCT
router.get("/add", (req, res) => {
  res.render("product/add");
});

router.post("/add", (req, res) => {
  var product = new ProductModel(req.body);
  product.save((err) => {
    if (!err) {
      res.redirect("/product");
    }
  });
});

//----EDIT PRODUCT----
router.get("/edit/:id", (req, res) => {
  ProductModel.findById(req.params.id, (err, data) => {
    if (!err) {
       res.render("product/edit", { product: data })
    }
  })
})

router.post("/edit/:id", (req, res) => {
   ProductModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
     if (!err) {
       console.log("Edit product succeed !")
       res.redirect("/product")
     }
   })
})
//------DElete
router.get("/delete/:id", (req, res)=>{
    ProductModel.findByIdAndDelete(req.params.id, (err)=>{
        if(!err){
            console.log("Delete Success");
            res.redirect("/product");
        }
    } );
});

//----- Search
 router.post("/search", (req, res) => {
    ProductModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
        res.render("index", { product: data });
      }
    });
  });
router.post("/product/search", (req, res) => {
    ProductModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
        res.render("product/index", { product: data });
      }
    });
  });


//---Sort hOme
  router.get("/sort/asc", (req, res) => {
    ProductModel.find()
      .sort({ price: 1 })
      .exec((err, data) => {
        if (!err) {
          res.render("index", { product: data });
        }
      });
  });

router.get("/sort/desc", (req, res) => {
    ProductModel.find()
      .sort({ price: -1 })
      .exec((err, data) => {
        if (!err) {
          res.render("index", { product: data });
        }
      });
  });

 //Sort product
 router.get("/product/sort/asc", (req, res) => {
    ProductModel.find()
      .sort({ price: 1 })
      .exec((err, data) => {
        if (!err) {
          res.render("product/index", { product: data });
        }
      });
  });

router.get("/product/sort/desc", (req, res) => {
    ProductModel.find()
      .sort({ price: -1 })
      .exec((err, data) => {
        if (!err) {
          res.render("product/index", { product: data });
        }
      });
  });

module.exports = router