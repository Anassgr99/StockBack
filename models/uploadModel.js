// const path = require('path');

// const saveFile = (file) => {
//   // You can implement any file processing or validation here if needed
//   const filePath = path.join('public/images', file.filename);
//   return filePath; // Returning the relative path of the saved file
// };

// module.exports = { saveFile };

const path = require('path');

const saveFile = (file) => {
  const filePath = path.join('public/images', file.filename);
  return filePath; // Relative path for saving
};

module.exports = { saveFile };
