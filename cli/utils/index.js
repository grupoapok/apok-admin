const fs = require('fs');
const path = require('path');

const mkdir = (dest) => {
    if (!fs.existsSync(dest)) {
        try {
            fs.mkdirSync(path.resolve(dest), { recursive: true });
        } catch (err) {
            console.log(err);
            if (err.code !== 'EEXIST') throw err;
        }
    }
};

module.exports = {
    mkdir
}