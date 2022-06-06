const router = require ('express').Router()
const places = require('../models/places.js')
const db = require('../models')


//Create Routes
//Create one GET
router.get('/new', (req, res) => {
  res.render('places/new')
})

//GET /places
router.get('/', (req, res) => {
  db.Place.find()
  .then((places) => {
    res.render('places/index', { places })
  })
  .catch(err => {
    console.log(err)
    res.render('error404')
  })
})

//Read One by id
router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id).populate('comments')
  .then(place => {
    // console.log(place.comments)
    res.render('places/show', { place })
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})

//POST /places
router.post('/', (req, res) => {
  if(!req.body.pic){
    delete req.body['pic']
  }
  db.Place.create(req.body)
  .then( () => {
    res.redirect('/places')
  })
  .catch(err => {
    if (err && err.name == 'ValidationError'){
        let message = 'Validation Error: '
        for(const field in err.errors) {
          message += `${field} was ${err.errors[field].value}.`
          message += `${err.errors[field].message}`
        }
        res.render('places/new', { message })
    }
    else {
      res.render('error404')
    }
  })
})

//Delete Place
router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
  .then(place => {
    res.redirect('/places')
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})



//Edit Place
router.get('/:id/edit', (req, res) => {
 db.Place.findById(req.params.id)
  .then(place => {
    res.render('places/edit', { place })
  })
  .catch(err => {
    res.render('error404')
  })
})

router.put('/:id', (req,res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect(`/places/${req.params.id}`)
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})

//Add comment
router.post('/:id/comment', (req, res) => {
  // req.body.rant = req.body.rant ? true : false
  // db.Place.findById(req.params.id)
  //   .then(place => {
  //     place.comments.push(comment.id)
  //     place.save()
  //     .then(() => {
  //       res.redirect(`/places'${req.params.id}`)
  //     })
  //   })
  //   .catch(err => {
  //     console.log('err', err)
  //     res.render('error404')
  //   })
  req.body.rant === 'on' ? req.body.rant = true : req.body.rant = false;
  db.Place.findById(req.params.id)
  .then(place => {
      db.Comment.create(req.body)
      .then(comment => {
          place.comments.push(comment.id)
          place.save()
          .then(() => {
              res.redirect(`/places/${req.params.id}`)
          })
      })
      .catch(err => {
          res.render('error404')
      })
  })
  .catch(err => {
      res.render('error404')
  })
})


module.exports = router