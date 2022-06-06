const React = require('react')
const Def = require('../default')

function show (data) {
    console.log(data)
    let comments = (
        <h3 className="inactive">
            No comments yet!
        </h3>
    )
    let rating = (
        <h3 className='inactive'>
            Not yet rated
        </h3>
    )
        if (data.place.comments.length) {
            let sumRatings = data.place.comments.reduce((tot, c) => {
                return tot + c.stars
            }, 0)
            let averageRating = Math.round(sumRatings / data.place.comments.length)
            let stars = ''
            for (let i = 0; i < averageRating; i++) {
                stars += ':star emoji'
            }
            rating = (
                <h3>
                    { stars } stars 
                </h3>
            )
            comments = data.place.comments.map(c => {
                return (
                    <div className="border col-sm-4">
                        <h2 className="rant">{c.rant ? 'Rant!' : 'Rave!'}</h2>
                        <h4>{c.content}</h4>
                        <h3>
                            <strong>- {c.author}</strong>
                        </h3>
                        <h4>Rating: {c.stars}</h4>
                    </div>
                )
            })
        }
    return (
        <Def>
          <main>
            <h1>{ data.place.name }</h1>
            <div className="card" style={{width: 700}}>
                <img className="card-img-top" src={data.place.pic} alt={data.place.name}/>
            <div className="card-body">
            <h5 className="card-title">{data.place.name}</h5>
                <p className="card-text">{data.place.showEstablished()} Cuisine: {data.place.cuisines}</p>
            </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">City: {data.place.city}</li>
                    <li className="list-group-item">State: {data.place.state}</li>
                    <li className="list-group-item">Cuisines: {data.place.cuisines}</li>
                </ul>
                <div>
                    <h5>Ranting</h5>
                    <p>{rating}</p>
                </div>
                <div>
                    <h5>Comments</h5>
                    {comments}
                </div>
            </div>
            <form method='POST' action={`/places/${data.place._id}/comment`}>
                    <div className='form-group'>
                        <label htmlFor='author'>Author</label>
                        <input className='form-control' id='author' name='author' type='text'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='content'>Comment</label>
                        <input className='form-control' type='text' id='content' name='content'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='stars'>Star Rating</label>
                        <input className='form-control' id='stars' name='stars' type='number' step="0.5"/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rant'>Rant?</label>
                        <input className='form-control' id='rant' name='rant'/>
                    </div>
                    <input className='btn btn-primary' type='submit' value='Add comments'/>
                </form>
            <a href={`/places/${data.place._id}/edit`} className='btn btn-warning'>Edit</a>
            
            <form method='POST' action={`/places/${data.place._id}?_method=DELETE`}>
                <button type='submit' className='btn btn-danger'>Delete</button>
            </form>
          </main>
        </Def>
    )
}

module.exports = show
