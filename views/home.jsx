const React = require('react')
const Def = require('./default')

function home () {
    return (
        <Def>
            <main>
                <h1>Home</h1>
                <div>
                    <img src='/images/fruit-smoothie.jpg' alt='a delish smoothie'/>
                    <div>
                        Photo by Brooke Lark on Unsplash
                    </div>
                </div>
                <a href='/places'>
                    <button className='btn btn-primary'>Places Page</button>
                </a>
            </main>
        </Def>
    )
}

module.exports = home