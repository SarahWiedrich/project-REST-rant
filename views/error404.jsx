const React = require('react')
const Def = require('./default')

// error page with puppy face//
function error404 () {
    return (
        <Def>
            <main>
                <h1>404: PAGE NOT FOUND</h1>
                <p>Oops, sorry, we can't find this page</p>
                <img src='/images/Puppy Place image.jpeg' alt='a cute puppy'/>
            </main>
        </Def>
    )
}

module.exports = error404