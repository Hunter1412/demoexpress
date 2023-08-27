const fs = require('fs');

const isExist = (path) => {
    return fs.existsSync(path);
}

module.exports = (filename) => {
    const pathImage = _path + '/images/' + filename;
    if (isExist(pathImage)) {
        fs.unlink(pathImage, function (err, data) {
            if (err) throw err;
            console.log('Delete file successfully');
        });
    }
}
