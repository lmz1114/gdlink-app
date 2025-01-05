const ProfileController = require('../controller/ProfileController');
const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

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
router.get('/:userId',ProfileController.getUserData);
router.patch('/remove_image/:userId',ProfileController.deletePicture);
router.post('/upload_image/:userId', upload.single('image'),ProfileController.updatePicture);
router.post('/change_password/:userId',ProfileController.updatePassword);

module.exports = router;