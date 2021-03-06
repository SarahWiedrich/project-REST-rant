const React = require('react')

//home page localhost:3000
function Def (html) {
    return (
        <html>
            <head>
                <title>Rest-Rant</title>
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'/>
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js'/>
                <link rel='stylesheet' href='/css/style.css'/>
            </head>
            <body>
                <nav>
                    <ul>
                        <li>
                            <a href= '/'>Home</a>
                        </li>
                        <li>
                            <a href='/places'>Places</a>
                        </li>
                        <li>
                            <a href='/places/new'>Add Place</a>
                        </li>
                    </ul>
                </nav>
                {html.children}
            </body>
        </html>
    )
}

module.exports = Def