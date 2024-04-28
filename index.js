const express = require('express'),
    logger = require('morgan'),
    path = require('path');

const PORT = process.env.PORT || 8080; // You can set the port you want as default, it is not necessary to use [8080]

const index = require('./routes/index');

const runServer = async () => {
    const app = express();
    app.set('json spaces', 2)
        .set('view engine', 'ejs')
        .engine('ejs', require('ejs').__express)
        .use(logger('dev'))
        .use(express.json())
        .use(express.static(path.join(__dirname, 'public'))) // Specifies the root directory from which to serve static assets.
        .use('/', index) // Import the index for the main route of the page.
        .use('*', function(req, res) { // This middleware will catch all requests that do not match the routes defined above and respond with a 404 error page.
            res.status(404).render(process.cwd() + '/public/404', {
                data: {
                    title: 'Page not found.',
                    message: 'Error page test.'
                }
            })
        })
        .disable('x-powered-by')
        .listen(PORT, () => console.log(`Server is running in port ${PORT}`)); // Starting server on X port.
}

runServer().catch(() => runServer());
