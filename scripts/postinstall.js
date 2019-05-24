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

const ncp = require('ncp').ncp;
const pwd = process.env.INIT_CWD;
const dest = `${pwd}/src`;

['views', 'store', 'i18n', 'config', 'router.js'].forEach(folder => {
  ncp(`./src/${folder}`, `${dest}/${folder}`);
});

