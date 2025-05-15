// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "media"); // Set destination folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`; // Generate unique file name
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png|gif|webp/;
//   const mimeType = fileTypes.test(file.mimetype);
//   const extname = fileTypes.test(path.extname(file.originalname));
//   if (mimeType && extname) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Invalid file format. Supported formats: jpeg, jpg, png, gif, webp"
//       )
//     );
//   }
// };

// // Configure upload for single and multiple file uploads
// const uploadSingle = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 }, // 5 MB limit
//   fileFilter: fileFilter,
// }).single("image");

// const uploadMultiple = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 }, // 5 MB limit per file
//   fileFilter: fileFilter,
// }).array("images", 10); // Allow up to 10 files



// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 }, // 5MB per file
//   fileFilter: fileFilter,
// });


// module.exports = {
//   uploadSingle,
//   uploadMultiple,

// };


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media"); // Set destination folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// ✅ Allow PDF (and optionally images too)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
  const isMimeTypeValid = allowedTypes.test(file.mimetype);
  const isExtNameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeTypeValid && isExtNameValid) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Supported formats: jpeg, jpg, png, gif, webp, pdf"
      )
    );
  }
};

// Upload handlers
const uploadSingle = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
}).single("image"); // Use "file" as the field name for PDF uploads

const uploadPdf = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
}).single("file"); // Use "file" as the field name for PDF uploads


const seventhUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "tenthMarksheet", maxCount: 1 },
  { name: "tenthCertificate", maxCount: 1 },
  { name: "twelveMarksheet", maxCount: 1 },
  { name: "twelveCertificate", maxCount: 1 },
  { name: "passport", maxCount: 1 },
  { name: "essay", maxCount: 1 },
  { name: "instructionLetter", maxCount: 1 },
  { name: "bachelorCertificate", maxCount: 1 },
  { name: "bachelorTranscript", maxCount: 1 },
]);

const uploadMultiple = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).array("files", 10); // Up to 10 files

module.exports = {
  uploadSingle,
  uploadMultiple,
  seventhUpload,
  uploadPdf
};
