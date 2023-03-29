const express = require('express');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');
const path = require('path');

const app = express();

// Configure express (Templating Engine) view engine for dynamic html pages:
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;


// Express Middleware:
app.use((req, res, next) => {
    const start = Date.now();
    next();
    // actions go here...
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

// serve static files middleware:
app.use('/site', express.static(path.join(__dirname, 'public')));

// Register our json parser middleware:
app.use(express.json());

// Create a route to handle our handelbars template:
app.get('/', (req, res) => {
    res.render('index', {
        title: 'My friends are very clever',
        caption: 'Let\'s go skiing!',
    });
});

// Register our routes:
app.use('/api/friends', friendsRouter);
app.use('/api/messages', messagesRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} ...`);
});

module.exports = app;


// Restful APIs:

// REST (Representational State Transfer) is an architectural style for 
// building web services. RESTful APIs are designed to be simple, scalable,
// and flexible. The core principles of RESTful APIs are:

// Client-server architecture: A clear separation between the client and 
// the server components of the application.

// Statelessness: The server does not store any client context between 
// requests. Each request contains all the information necessary for the 
// server to understand it.

// Cacheability: Responses to requests should be able to be cached by 
// intermediaries such as proxies to improve performance.

// Uniform interface: The API should have a consistent interface for 
// interacting with resources, including standard HTTP methods (GET,
// POST, PUT, DELETE), resource identification using URIs, and 
// representation of resources in a standard format (e.g. JSON or XML).

// Layered system: The architecture should be layered so that components
//  cannot "see" beyond the immediate layer they are interacting with.

// Following these principles can help create a reliable, scalable,
// and maintainable API that can be used by a wide range of clients.