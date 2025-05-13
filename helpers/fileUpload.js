

const multer = require("multer");
const path = require('path');
const fs = require('fs');

// load environment variables
const { 
    multer_storage_location,
} = require("../config/config");

// Allowed file types
const FILE_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
  'text/plain': 'txt',
};

const getUserNameFromRequest = (_dirname="") => {
    try {
        if(_dirname !== "") return `${_dirname}`;
        else return `${_dirname}_default`;
    } catch (err) {
        console.log("Error E: --", err?.message);
        return "default-user";
    }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { file_name } = req.body;
    const username = getUserNameFromRequest(file_name);
    const uploadPath = path.join(__dirname, `../${multer_storage_location}`, username);

    // Create folder if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err, uploadPath);
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    const ext = FILE_TYPES[file.mimetype];
    if (!ext) return cb(new Error('Invalid file type'), false);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
    cb(null, uniqueName);
  }
})

const fileFilter = (req, file, cb) => {
  if (FILE_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter })

const fileUpload = (req, res) => {
    // const { profile_picture } = req.body;
    // upload.single('profile_')
}