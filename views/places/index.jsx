const React = require('react')
const Def = require('../default')

function Index (data) {
  let placesFormatted = data.places.map((place, index) => {
      return (
          <div className='col-sm-6'>
              <h2>{place.name}</h2>
              <a href={`/places/${index}`}>
                  {place.name}
              </a>
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
              <h1>REST-Rant</h1>
              <div className='row'>
                 {placesFormatted}
              </div>
          </main>
      </Def>
  )
}

module.exports = Index