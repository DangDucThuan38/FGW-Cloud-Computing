var express = require('express');
const BoyModel = require('../models/BoyModels')
var router = express.Router();




router.get('/', (req, res) => {
  BoyModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      res.render('boy/index', { boy: data })
    }
  })
})


router.get('/manage', (req, res) => {
  BoyModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      res.render('boy/manage', { boy: data })
    }
  })
})


router.get("/detail/:id", (req, res) => {
  //lấy giá trị id của document gửi từ url
  var boy_id = req.params.id;
  //tìm kiếm document trong collection theo id
  BoyModel.findById(boy_id, (err, data) => {
    if (!err) {
      //render ra file detail chứa dữ liệu của document
      res.render("boy/detail", { boy: data });
    }
  });
});

//-----ADD PRODUCT
router.get("/add", (req, res) => {
  res.render("boy/add");
});

router.post("/add", (req, res) => {
  var boy = new BoyModel(req.body);
  boy.save((err) => {
    if (!err) {
      res.redirect("/boy");
    }
  });
});

//----EDIT PRODUCT----
router.get("/edit/:id", (req, res) => {
  BoyModel.findById(req.params.id, (err, data) => {
    if (!err) {
       res.render("boy/edit", { boy: data })
    }
  })
})

router.post("/edit/:id", (req, res) => {
   BoyModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
     if (!err) {
       res.redirect("/boy")
     }
   })
})
//------DElete
router.get("/delete/:id", (req, res)=>{
    BoyModel.findByIdAndDelete(req.params.id, (err)=>{
        if(!err){
            console.log("Delete Success");
            res.redirect("/boy");
        }
    } );
});

//----- Search
 router.post("/search", (req, res) => {
    CategoryModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
        res.render("category/index", { category: data });
      }
    });
  });

 //Sort product
 router.get("/sort/asc", (req, res) => {
    BoyModel.find()
      .sort({ price: 1 })
      .exec((err, data) => {
        if (!err) {
          res.render("boy/index", { boy: data });
        }
      });
  });
   router.get("/sort/desc", (req, res) => {
    BoyModel.find()
      .sort({ price: -1 })
      .exec((err, data) => {
        if (!err) {
          res.render("boy/index", { boy: data });
        }
      });
  });





module.exports = router;
