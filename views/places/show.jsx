const React = require('react')
const Def = require('../default')

function show (data) {
    return (
        <Def>
          <main>
            <h1>{ data.place.name }</h1>
            <div className="card" style={{width: 700}}>
                <img className="card-img-top" src={data.place.pic} alt={data.place.name}/>
            <div className="card-body">
            <h5 className="card-title">{data.place.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">City: {data.place.city}</li>
                    <li className="list-group-item">State: {data.place.city}</li>
                    <li className="list-group-item">Cuisines: {data.place.cuisines}</li>
                </ul>
                <div>
                    <h5>Ranting</h5>
                    <p>Not Rated</p>
                </div>
                <div>
                    <h5>Comments</h5>
                    <p>No comments yet!</p>
                </div>
            </div>
            <a href={`/places/${data.id}/edit`} className='btn btn-warning'>Edit</a>
            
            <form method='POST' action={`/places/${data.id}?_method=DELETE`}>
                <button type='submit' className='btn btn-danger'>Delete</button>
            </form>
          </main>
        </Def>
    )
}

module.exports = show
