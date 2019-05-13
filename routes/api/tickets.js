const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");
const Ticket = require('../../models/Ticket.js');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
},
limits:{
    fileSize: 1024 * 1024
}}); 
const fs = require('fs');

/* GET ALL TICKETS */ 
//FOR ADMIN
router.get('/all',passport.authenticate('jwt', { session: false }), function(req, res, next) {
  Ticket.find().populate('owner').populate('admin').exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
}); 

/* GET ALL NEW TICKETS */ 
//FOR ADMIN
router.get('/admin/newTickets',passport.authenticate('jwt', { session: false }), function(req, res, next) {
  Ticket.find({status:'New'}).populate('owner').populate('admin').exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET ALL TICKETS UNDER ADMIN */ 
//FOR ADMIN
router.get('/admin/all',passport.authenticate('jwt', { session: false }), function(req, res, next) {
  Ticket.find({admin:req.user._id}).populate('owner').populate('admin').exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
}); 



// router.get('/',passport.authenticate('jwt', { session: false }), function(req, res, next) {
//   Ticket.find({owner:req.user._id}).then((todos) => {
//     res.json(todos);
//   }).catch((e)=> {
//     res.status(500).send();
//   });
// });

/* GET TICKETS WITH STATUS NEW FOR LOGGED IN USER*/
router.get('/user/newTickets', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  Ticket.find({owner:req.user._id, 'status': 'New'}, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET TICKETS FOR LOGGED IN USER*/
router.get('/user', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  Ticket.find({owner:req.user._id}).populate('owner').populate('admin').exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE TICKET BY ID */
/* router.get('/:id', function(req, res, next) {
  Ticket.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */
router.get("/:id", passport.authenticate('jwt', {session:false}), function(req,res) {
  const id = req.params.id;
      Ticket.findOne({_id: id})
      .populate('owner')
      .populate('admin')
      .exec( function(err, ticket) {
        if (!ticket) {
            return res.status(404).send(); //todo not found
        }
        res.json(ticket); 
    })
})

router.post('/uploadphoto/:id', upload.single('myImage'), passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const id = req.params.id;
  if (!req.file) return res.send('Please upload a file')
  var img = fs.readFileSync(req.file.path);
var encode_image = img.toString('base64');
// Define a JSONobject for the image attributes for saving to database


  var  contentType = req.file.mimetype;
  // var  image =   new Buffer(encode_image, 'base64')

  Ticket.findOneAndUpdate({_id: id}, {image: encode_image, imageContentType: contentType, imageTitle: req.file.originalname}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
;

// db.collection('quotes').insertOne(finalImg, (err, result) => {
//   console.log(result)

//   if (err) return console.log(err)

//   console.log('saved to database')
//   res.redirect('/')
 
   
// })
})

/* SAVE TICKET */
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  Ticket.create({...req.body, owner:req.user._id, author:req.user.name}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); 


/* UPDATE TICKET */
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  const id = req.params.id;
  Ticket.findOneAndUpdate({_id: id}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); 


/* DELETE TICKET */
/* router.delete('/:id', function(req, res) {
  Ticket.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */

router.delete("/:id",passport.authenticate('jwt', { session: false }),  function(req, res) {
      Ticket.findOneAndDelete({ _id: req.params.id }, function(err,ticket) {
          if (err) {
              console.log(err);
          }
          res.json(ticket);
      } );
});

module.exports = router;