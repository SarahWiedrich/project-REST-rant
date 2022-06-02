const router = require ('express').Router()
const places = require('../models/places.js')
const db = require('../models')
const { acceptsEncodings } = require('express/lib/request')

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
    console.log(place.comments)
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
        console.log('Validation error message', message)
        res.render('places/new', { message })
    }
    else {
      res.render('error404')
    }
  })
})

//Delete Place
router.delete('/:id', (req, res) => {
  let id = Number(req.params.id)
  if(isNaN(id)){
    res.render('error404')
  } else if (!places[id]) {
    res.render('error404')
  } else{
    places.splice(id, 1)
    res.redirect('/places')
  }
})

//Edit Place
router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id)) {
    res.render('error404')
  } else {
    res.render('places/edot', { place: places[id], id })
  }
})

router.put('/:id', (req,res) => {
  let id = Number(req.params.id)
  if (isNaN(id)) {
    res.render('error404')
  } else if (!places[id]) {
    res.render('error404')
  } else {
    if(!req.body.pic) {
      req.body.pic = 'http://placekitten.com/400/400'
    }
    if(!req.body.city) {
      req.body.city = 'Anytown'
    }
    if(!req.body.state) {
      req.body.state = 'USA'
    }
    places[id] = req.body
    res.redirect(`/places/${id}`)
  }
})

router.post('/:id/comment', (req, res) => {
  req.body.rant = req.body.rant ? true : false
  db.Place.findById(req.params.id)
    .then(place => {
      place.comments.push(comment.id)
      place.save()
      .then(() => {
        res.redirect(`/places'${req.params.id}`)
      })
    })
    .catch(err => {
      console.log('err', err)
      res.render('error404')
    })
})

module.exports = router

////??? My good code below

// router.get('/', (req, res) => { 
//     res.render('places/index', { places })
//   })

//   router.get('/new', (req,res) => {
//     res.render('places/new')
//   })

//   router.get('/:id', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       res.render('places/show', { place: places[id], id })
//     }
//   })

//   router.get('/:id/edit', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       res.render('places/edit', { place: places[id], id })
//     }
//   })

//   router.post('/', (req, res) => {
//     if (!req.body.pic){
//       req.body.pic = 'http://placekitten.com/400/400'
//     }
//     if (!req.body.city) {
//       req.body.city = 'Anytown'
//     }
//     if (!req.body.state) {
//       req.body.state = 'USA'
//     }
//     places.push(req.body)
//     res.redirect('/places')
//   })

//   router.delete('/:id', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       places.splice(id, 1)
//       res.redirect('/places')
//     }
//   })
  
//   router.put('/:id', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')    
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       if (!req.body.pic) {
//         req.body.pic = 'http://placekitten.com/400/400'
//       }
//       if (!req.body.city) {
//         req.body.city = 'Anytown'
//       }
//       if (!req.body.state) {
//         req.body.state = 'USA'
//       }
//       places[id] = req.body
//       res.redirect(`/places/${id}`)
//     }
//   })

// module.exports = router