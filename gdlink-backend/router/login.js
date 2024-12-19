// routes/login.js
const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const router = express.Router();
const { getConnection } = require('../db');

router.post('/db_check', async (req, res) => {
  const conn = await getConnection();
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    console.log('Missing required fields.');
    return res.status(400).json({
      login_type: null,
      message: 'Missing required fields.',
      user: null,
    });
  }

  try {
    const [existingUser] = await conn.query('SELECT * FROM users WHERE user_id = ?;', [user_id]);

    if (!existingUser) {
      return res.json({
        login_type: 1,
        message: 'User not found.',
        user: null,
      });
    }

    const user = existingUser;

    if (!user.is_pass_changed) {
      return res.json({
        login_type: 2,
        message: 'Password change required.',
        user: user,
      });
    }

    if (bcrypt.compare(user.password,password)) {
      return res.status(200).json({
        login_type: 0,
        message: 'User login successful.',
        user: user,
      });
    } else {
      return res.status(401).json({
        login_type: null,
        message: 'Wrong password. Please try again.',
        user: null,
      });
    }
  } catch (error) {
    console.error('Database error:', error.message);
    return res.status(500).json({
      login_type: null,
      message: 'Server error. Please try again later.',
      user: null,
    });
  } finally {
    if (conn) conn.end();
  }
});


router.post('/default_login', async (req, res) => {
  const { userId, password } = req.body;

  const loginURL = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=authentication&login=${userId}&password=${password}`; 

  try {
    const response = await axios.get(loginURL);

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'No valid data found.', user:null });
    }

    const jsonInst = response.data[0];
    return res.status(200).json({ message: 'User fetched successfully.', user: jsonInst });
  } catch (err) {
    console.error('Error fetching from external API:', err.message);
    return res.status(500).json({ message: 'Server error occurred.', user:null });
  }
});

router.post('/first_time_login', async (req, res) => {
  const conn = await getConnection();
  const { username, role, email, user_id } = req.body;
  console.log(user_id);
  console.log(username);

  if (!user_id || !role ||!email || !user_id) {
    return res.status(400).json({ message: 'Missing required fields.', user: null });
  } 

  try{
    const result = await conn.query(
      'INSERT INTO users (user_id, email, role, name) VALUES (?, ?, ?, ?)',[user_id, email, role, username]
    );

    const [insertedUser] = await conn.query('SELECT * FROM users WHERE user_id = ?',[user_id]);
    if (insertedUser) {
      return res.status(201).json({ message: 'User inserted successfully!', user: insertedUser });
    } else{
      return res.status(401).json({ message: 'Fail to insert', user : null});
    }
  } catch (err) {
    console.error('Error inserting user:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
