var express = require('express');
const GirlModel = require('../models/GirlModels')
var router = express.Router();




router.get('/', (req, res) => {
  GirlModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      res.render('girl/index', { girl: data })
    }
  })
})
router.get('/manage', (req, res) => {
  GirlModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      res.render('girl/manage', { girl: data })
    }
  })
})


router.get("/detail/:id", (req, res) => {
  //lấy giá trị id của document gửi từ url
  var girl_id = req.params.id;
  //tìm kiếm document trong collection theo id
  GirlModel.findById(girl_id, (err, data) => {
    if (!err) {
      //render ra file detail chứa dữ liệu của document
      res.render("girl/detail", { girl: data });
    }
  });
});

//-----ADD PRODUCT
router.get("/add", (req, res) => {
  res.render("girl/add");
});

router.post("/add", (req, res) => {
  var boy = new GirlModel(req.body);
  boy.save((err) => {
    if (!err) {
      res.redirect("/girl");
    }
  });
});

//----EDIT PRODUCT----
router.get("/edit/:id", (req, res) => {
  GirlModel.findById(req.params.id, (err, data) => {
    if (!err) {
       res.render("girl/edit", { girl: data })
    }
  })
})

router.post("/edit/:id", (req, res) => {
   GirlModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
     if (!err) {
       res.redirect("/girl")
     }
   })
})
//------DElete
router.get("/delete/:id", (req, res)=>{
    GirlModel.findByIdAndDelete(req.params.id, (err)=>{
        if(!err){
            console.log("Delete Success");
            res.redirect("/girl");
        }
    } );
});


 router.get("/sort/desc", (req, res) => {
    GirlModel.find()
      .sort({ price: -1 })
      .exec((err, data) => {
        if (!err) {
          res.render("girl/index", { girl: data });
        }
      });
  });
 router.get("/sort/asc", (req, res) => {
    GirlModel.find()
      .sort({ price: 1 })
      .exec((err, data) => {
        if (!err) {
          res.render("girl/index", { girl: data });
        }
      });
  });



module.exports = router;
