const React = require('react')
const Def = require('../default')

function Index (data) {
  let placesFormatted = data.places.map((place) => {
      return (
          <div className='col-sm-6'>
              <h2>{place.name}</h2>
              <p className='text-center'>
                  {place.cuisines}
              </p>
              <img src={place.pic} alt={place.name}></img>
              <p className='text-center'>
                 Located In {place.city}, {place.state}
              </p>
          </div>
      )
  })
  return (
      <Def>
          <main>
              <h1>Places to Rant or Rave or just be nice to</h1>
              <div className='row'>
                 {placesFormatted}
              </div>
          </main>
      </Def>
  )
}

module.exports = Index