/** File to config multer
 * to receive uploaded images
 */

const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads"),
        filename: (req, file, cb) => {
            const extName = path.extname(file.originalname);
            const fileName = path.basename(file.originalname, extName);
            cb(null, `${fileName}-${Date.now()}${extName}`);
        }
    })

}