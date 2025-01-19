const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = 8081;

// Use CORS Middleware
app.use(cors()); // Allows all domains to access the backend

// Import Routers
const LoginRouter = require('./router/LoginRouter');
const ProfileRouter = require('./router/ProfileRouter');
const ResourcesSharingRouter = require('./router/ResourcesSharingRouter');
const CategoryRouter = require('./router/CategoryRouter');
const HomeRouter = require('./router/HomeRouter');
const FavouriteRouter = require('./router/FavouriteRouter');
const GroupRouter = require('./router/GroupRouter');
const GroupMemberRouter = require('./router/GroupMemberRouter');
const NotificationRouter = require('./router/NotificationRouter');
const UserLogRouter = require('./router/UserLogRouter');


// Middleware to parse JSON request bodies
app.use(express.json()); 

// Use the routes
app.use('/login', LoginRouter);
app.use('/profile', ProfileRouter);
app.use('/resources', ResourcesSharingRouter);
app.use('/categories', CategoryRouter);
app.use('/home', HomeRouter);
app.use('/favourites', FavouriteRouter);
app.use('/groups', GroupRouter);
app.use('/groups/members', GroupMemberRouter);
app.use('/notification', NotificationRouter);
app.use('/userlog', UserLogRouter);


// 404 Fallback
app.use((req, res) => {
  res.status(404).send({ error: 'API endpoint not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});


