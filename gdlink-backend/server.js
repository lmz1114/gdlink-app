const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = 8081;

// Use CORS Middleware
app.use(cors()); // Allows all domains to access the backend

// Import Routers
const loginRouter = require('./router/login');
const profileRouter = require('./router/profile');
const ResourcesSharingRouter = require('./router/ResourcesSharingRouter');
const CategoryRouter = require('./router/CategoryRouter');
const HomeRouter = require('./router/HomeRouter');

// Middleware to parse JSON request bodies
app.use(express.json()); 

// Use the routes
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/resources', ResourcesSharingRouter);
app.use('/categories', CategoryRouter);
app.use('/home', HomeRouter);


// 404 Fallback
app.use((req, res) => {
  res.status(404).send({ error: 'API endpoint not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});


