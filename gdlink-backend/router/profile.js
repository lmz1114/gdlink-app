//profile.js

const express = require('express');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const router = express.Router();
const { getConnection } = require('../db');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'profile_picture/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.use('/images',express.static(path.join(__dirname,'..','profile_picture')));

router.get('/:user_id', async(req,res) => {
    const conn = await getConnection();
    const user_id = req.params.user_id;

    try{
        const user = await conn.query('Select* from users where user_id = ?',[user_id]);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({user: user});
    }catch(err){
        return res.status(500).json({ message: 'Error retrieving data from database' });
    }finally{
        if (conn) conn.release(); 
    }
})

router.post('/upload_image/:user_id', upload.single('image'),async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const conn = await getConnection();
    const user_id = req.params.user_id;
    const filename = req.file.filename;
    try{
        await conn.query('UPDATE users SET picture = ? WHERE user_id = ?', [filename, user_id]);
        res.status(200).json({ message: 'Profile picture updated successfully', filename });
    }catch(error){  
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }finally{
        if (conn) conn.release(); 
    }
});

async function hashPassword(password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

router.post('/change_password/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const { isDefaultPassword, currentPassword, newPassword, confirmPassword } = req.body;
    console.log(isDefaultPassword);
    console.log(currentPassword);
    console.log(newPassword);
    console.log(confirmPassword);

    if (!newPassword || !confirmPassword || (isDefaultPassword && !currentPassword)) {
        return res.status(400).json({ message: "All fields must be filled" });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    const conn = await getConnection();
    try {
        if(isDefaultPassword){
        // Retrieve the current password from the database
        const [result] = await conn.query('SELECT password FROM users WHERE user_id = ?', [user_id]);
        const dbPassword = result.password;
        console.log(result.password);

        if (!dbPassword) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate current password if it's not a default password reset
            const isCurrentMatch = await bcrypt.compare(currentPassword, dbPassword);
            if (!isCurrentMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await conn.query('UPDATE users SET password = ?, is_pass_changed = 1 WHERE user_id = ?', [hashedPassword, user_id]);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (conn) conn.release();
    }
});


// app.get('/images/:filename', async (req, res) => {
//     const filename = req.params.filename;
//     const imagePath = path.join(__dirname, 'profile_picture', filename);
//     res.sendFile(imagePath,(err) => {
//         if(err){
//             return res.status(404).send('Image not found');
//         }
//     })   
// });

module.exports = router;
