
// load dependencies
const _ = require('lodash');
const { ObjectId } = require('mongodb')
const multer = require('multer')
const tmp = require('tmp');
const path = require('path')
const fs = require('fs')
const archiver = require("archiver");
const { v4: uuidv4 } = require('uuid');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_company_archive, get_company_archive, get_company_archive_by_id, update_company_archive, delete_Many } = require('../services/companyArchiveServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { get_profile_by_id } = require('../services/profileServices');
const { extractToken, isAdmin, isTeamLeader } = require('../middlewares/authMiddleware');
const app = expressRouter.Router();

// load configuration variables
const { max_file_size } = require("../config/config")

// ===== Multer Storage Config =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const companyName = req.body.company_name || 'default';
      const safeName = companyName.replace(/[^a-zA-Z0-9_-]/g, "_"); // sanitize folder name
      const uploadDir = path.join(__dirname, `../uploads/companyArchives/${safeName}`);

      // Create folder if it doesn’t exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: function (req, file, cb) {
    // Keep original filename
    cb(null, file.originalname);
  }
});

// ===== File Filter (restrict file types) =====
function fileFilter(req, file, cb) {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('❌ Invalid file type. Only JPG, PNG, PDF, DOCX are allowed.'));
  }
}

// ===== Multer Upload Config =====
const upload = multer({
  storage: storage,
  limits: { fileSize: max_file_size }, // e.g. 50MB
  fileFilter: fileFilter
});

app.get('/view', canRead('read'), async (req, res) => {
    try {
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
        const _is_admin = await isAdmin(req, res);
        const _is_team_leader = await isTeamLeader(req, res);
        
        const company_archive_data = _is_admin == true ? await get_company_archive({}) : _is_team_leader == true ? await get_company_archive({ groupId: profile_data?.groupId?._id }) : await get_company_archive({ profileId: profile_data?._id });
        // const company_archive_data = await get_company_archive({});
    
        if(!_.isEmpty(company_archive_data)) return apiResponse.successResponseWithData(res, "Company information", company_archive_data);
        else return apiResponse.ErrorResponse(res, "Sorry, no Company data exists");
    } catch(err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.get('/download-archive/:id', canRead('read'), async (req, res) => {
  try {
    const archiveId = req.params.id;
    const companyData = await get_company_archive_by_id(archiveId);

    const companyName = companyData?.company_name || "default";
    const safeName = companyName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const uploadDir = path.join(__dirname, `../uploads/companyArchives/${safeName}`);

    if (!fs.existsSync(uploadDir)) {
      return res.status(404).json({ message: "No files found" });
    }
    
    const tmpDir = path.join(__dirname, "../tmp");
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
    }

    const tmpZipPath = path.join(__dirname, "../tmp", `${uuidv4()}_${safeName}_archive.zip`);
    const output = fs.createWriteStream(tmpZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", err => {
      console.error("Archiver error:", err);
      return res.status(500).json({ error: err.message });
    });

    archive.pipe(output);

    const files = await fs.promises.readdir(uploadDir);
    for (const file of files) {
      archive.file(path.join(uploadDir, file), { name: file });
    }

    await archive.finalize();

    output.on("close", () => {
      // Schedule deletion after 10 minutes
      setTimeout(() => {
        fs.unlink(tmpZipPath, err => {
          if (err) console.error("Failed to delete temp archive:", err);
        });
      }, 10 * 60 * 1000); // 10 minutes

        // Return download link
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const downloadUrl = `${baseUrl}/api/company-archive/download-temp-archive?path=${encodeURIComponent(tmpZipPath)}`;
        res.json({ downloadUrl });
    });

  } catch (err) {
    console.error("Internal error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/download-temp-archive', (req, res) => {
  const rawPath = req.query.path;

  if (!rawPath) {
    return res.status(400).json({ message: "Missing file path" });
  }

  // Decode and normalize the path
  const decodedPath = decodeURIComponent(rawPath);
  const tmpDir = path.join(__dirname, "../tmp");

  // Ensure the file is inside the tmp directory (security check)
  if (!decodedPath.startsWith(tmpDir)) {
    return res.status(403).json({ message: "Unauthorized file access" });
  }

  if (!fs.existsSync(decodedPath)) {
    return res.status(404).json({ message: "File not found or expired" });
  }

  res.sendFile(decodedPath, err => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

app.post('/create', canCreate('create'), upload.array('file_paths', 5), async (req, res) => {
    try {
        let company_archive_data = req.body;
        const { profileId } = extractToken(req?.headers?.authorization?.split('Bearer ')[1]);
        const profile_data = await get_profile_by_id(profileId);
        
        // Attach uploaded file relative paths
        if (req.files && req.files.length > 0) {
            // Map files to relative paths
            const filePaths = req.files.map(file => {
                // relative path from some base, e.g., 'uploads/companyArchives/...'
                return `uploads/companyArchives/${company_archive_data?.company_name.replace(/[^a-zA-Z0-9_-]/g, "_")}/${file?.filename}`;
            });
            company_archive_data.file_paths = filePaths
        }
    
        if(!_.isEmpty(company_archive_data)) {
            const [_existing_company_archive] = await get_company_archive({ company_name: company_archive_data?.company_name });
            if(_.isEmpty(_existing_company_archive)) { 
                company_archive_data['id'] = await getNextSequence('company_archive');
                company_archive_data['profileId'] = profile_data?._id;
                company_archive_data['groupId'] = profile_data?.groupId?._id;
                const _new_company_archive = await create(company_archive_data);
        
                if(!_.isEmpty(_new_company_archive)) return apiResponse.successResponseWithData(res, "New Company Created Successfully.", _new_company_archive);
                else apiResponse.ErrorResponse(res, "Unable to create new company.");
            } else apiResponse.ErrorResponse(res, "Company already exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_archive_data);
    } catch (err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/update', canUpdate('update'), async (req, res) => {
    try {
        const company_archive_data = req.body;
    
        if(!_.isEmpty(company_archive_data)) {
            const _existing_company_archive = await get_company_archive_by_id(company_archive_data?.id);
            if(!_.isEmpty(_existing_company_archive)) {
                const _updated_company_archive = await update_company_archive(company_archive_data?.id, _.omit(company_archive_data, ['id']));
        
                if(!_.isEmpty(_updated_company_archive)) return apiResponse.successResponseWithData(res, "Company Updated Successfully.", _updated_company_archive);
                else apiResponse.ErrorResponse(res, "Unable to update company.");
            } else apiResponse.ErrorResponse(res, "Company doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_archive_data);
    } catch (err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    try {
        const company_id = req.params.id;
        const company_archive_data = req.body;
    
        if(!_.isEmpty(company_archive_data) && company_id != "") {
            const _existing_company_archive = await get_company_archive_by_id(company_id);
            if(!_.isEmpty(_existing_company_archive)) {
                const _updated_company_archive = await update_company_archive(company_id, _.omit(company_archive_data, ['id']));
        
                if(!_.isEmpty(_updated_company_archive)) return apiResponse.successResponseWithData(res, "Company Updated Successfully.", _updated_company_archive);
                else apiResponse.ErrorResponse(res, "Unable to update company.");
            } else apiResponse.ErrorResponse(res, "Company doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_archive_data);
    } catch (err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    try {
        const company_archive_data = req.body;
    
        if(!_.isEmpty(company_archive_data)) {
            const _existing_company_archive = await get_company_archive_by_id(company_archive_data?.id);
            if(!_.isEmpty(_existing_company_archive)) {
                const _deleted_company_archive = await delete_company_archive(company_archive_data?.id);
        
                if(!_.isEmpty(_deleted_company_archive)) return apiResponse.successResponseWithData(res, "Company Deleted Successfully.", _deleted_company_archive);
                else apiResponse.ErrorResponse(res, "Unable to delete company.");
            } else apiResponse.ErrorResponse(res, "Company doesnot exists.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_archive_data);
    } catch (err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

app.post('/bulk-delete', canDelete('delete'), async (req, res) => {
    try {
        const company_archive_data = req.body;
    
        if(!_.isEmpty(company_archive_data)) {
            const _deleted_company_archive = await delete_Many({ _id: { $in: company_archive_data?.ids?.map(id => ObjectId.createFromHexString(id)) }});
            if(!_.isEmpty(_deleted_company_archive)) return apiResponse.successResponseWithData(res, "Compnay Deleted Successfully.", _deleted_company_archive);
            else apiResponse.ErrorResponse(res, "Unable to delete company.");
        } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", company_archive_data);
    } catch (err) {
        console.log("Internal server error: ", err);

        return apiResponse.ErrorResponse(res, "Internal server error");
    }
});

module.exports.companyArchiveController = app;