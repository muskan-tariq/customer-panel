const { cloudinary } = require('../config/cloudinary');

// Helper function to format response
const formatResponse = (success, data = null, error = null) => ({
  success,
  ...(data && { data }),
  ...(error && { error })
});

// @desc    Upload single image
// @route   POST /api/upload/single
// @access  Private
const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(
        formatResponse(false, null, 'No file uploaded')
      );
    }

    // Add metadata to response
    const response = {
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.format,
      size: req.file.size,
      width: req.file.width,
      height: req.file.height
    };

    res.json(formatResponse(true, response));
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json(
      formatResponse(false, null, 'Error uploading file')
    );
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json(
        formatResponse(false, null, 'No files uploaded')
      );
    }

    const uploadedFiles = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      format: file.format,
      size: file.size,
      width: file.width,
      height: file.height
    }));

    res.json(formatResponse(true, uploadedFiles));
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json(
      formatResponse(false, null, 'Error uploading files')
    );
  }
};

// @desc    Delete image
// @route   DELETE /api/upload/:publicId
// @access  Private
const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json(
        formatResponse(false, null, 'Public ID is required')
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json(formatResponse(true, { message: 'Image deleted successfully' }));
    } else {
      res.status(400).json(
        formatResponse(false, null, 'Error deleting image')
      );
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json(
      formatResponse(false, null, 'Error deleting image')
    );
  }
};

// @desc    Get upload signature (for client-side upload)
// @route   GET /api/upload/signature
// @access  Private
const getUploadSignature = async (req, res) => {
  try {
    const timestamp = Math.round((new Date).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({
      timestamp: timestamp,
      folder: 'tuffy-beauty'
    }, process.env.CLOUDINARY_API_SECRET);

    res.json(formatResponse(true, {
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    }));
  } catch (error) {
    console.error('Signature error:', error);
    res.status(500).json(
      formatResponse(false, null, 'Error generating signature')
    );
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  getUploadSignature
};