const fs = require('fs');
const camelCase = require('lodash.camelcase');
const utils = require('../utils');

const createIndexFile = (indexFile) => {
  fs.open(indexFile, 'w', (err, file) => {
    if (err) throw err;
    fs.appendFileSync(file, 'import * as actions from \'./actions\';\n');
    fs.appendFileSync(file, 'import { initialState, mutations } from \'./mutations\';\n\n');
    fs.appendFileSync(file, 'export default {\n\tstate: initialState,\n\tactions,\n\tmutations,\n};\n');
    console.log('Created index.js');
  });
};

const createTypesFile = (typesFile, actionsArr) => {
  fs.open(typesFile, 'w', (err, file) => {
    if (err) { throw err; }
    actionsArr.forEach((a) => {
      fs.appendFileSync(file, `export const ${a} = '${a}';\n`);
    });
    console.log('Created types.js');
  });
};

const createActionsFile = (actionsFile, actionsArr, crud) => {
  let separator = ', ';
  let prepend = '';
  let append = '';
  let actionsEnd = '  ';
  let actionsStart = ' ';
  if (actionsArr.length >= 5) {
    separator = ',\n  ';
    prepend = '\n  ';
    append = ',';
    actionsEnd = '\n';
    actionsStart = '';
  }

  const actionsForImport = prepend + actionsArr.join(separator) + append;

  fs.open(actionsFile, 'w', (err, file) => {
    fs.appendFileSync(file, '// import Vue from \'vue\';\n');
    fs.appendFileSync(file, 'import { processError } from "@/utils/functions";\n');
    if (!crud) {
      fs.appendFileSync(file, `import {${actionsStart}${actionsForImport}${actionsEnd}} from './types';\n\n`);
    } else {
      fs.appendFileSync(file, `import {${actionsStart}${actionsForImport}${actionsEnd}} from '@/store/ListTypes';\n\n`);
    }

    if (crud) {
      const actions = [];
      actionsArr.forEach((act) => {
        const path = `node_modules/@josercl/vue-admin/cli/stubs/actions/${act}.js`;
        if (fs.existsSync(path)) {
          actions.push(fs.readFileSync(path));
        }
      });
      fs.appendFileSync(file, actions.join("\n"));
    } else {
      actionsArr.forEach((act) => {
        const actionName = camelCase(act);
        fs.appendFileSync(file, `\nexport const ${actionName} = (context) => {\n  context.commit(${act});\n};\n`);
      });
    }

    console.log('Created actions.js');
  });
};

const createMutationsFile = (mutationsFile, actionsArr, crud) => {
  let separator = ', ';
  let prepend = '';
  let append = '';
  let actionsEnd = '  ';
  let actionsStart = ' ';
  if (actionsArr.length >= 5) {
    separator = ',\n  ';
    prepend = '\n  ';
    append = ',';
    actionsEnd = '\n';
    actionsStart = '';
  }

  const actionsForImport = prepend + actionsArr.join(separator) + append;

  fs.open(mutationsFile, 'w', (err, file) => {
    if (!crud) {
      fs.appendFileSync(file, `import {${actionsStart}${actionsForImport}${actionsEnd}} from './types';\n`);
    } else {
      fs.appendFileSync(file, `import {${actionsStart}${actionsForImport}${actionsEnd}} from '@/store/ListTypes';\n`);
    }
    fs.appendFileSync(file, 'import cloneDeep from "lodash.clonedeep";\n');
    fs.appendFileSync(file, 'import updatePagedList from "@/utils/updatedPagedList";\n\n');

    fs.appendFileSync(file, 'export const initialState = {\n');
    if (crud) {
      fs.appendFileSync(file, '  list: {},\n');
      fs.appendFileSync(file, '  pageSize: 20,\n');
      fs.appendFileSync(file, '  loading: false,\n');
      fs.appendFileSync(file, '  currentPage: 1,\n');
      fs.appendFileSync(file, '  totalPages: 1,\n');
      fs.appendFileSync(file, '  perPage: 1,\n');
      fs.appendFileSync(file, '  currentItem: {},\n');
      fs.appendFileSync(file, '  updating: false,\n');
    }
    fs.appendFileSync(file, '};\n\n');
    fs.appendFileSync(file, 'export const mutations = {\n');

    if (crud) {
      const mutations = [];
      actionsArr.forEach((act) => {
        const path = `node_modules/@josercl/vue-admin/cli/stubs/mutations/${act}.js`;
        if (fs.existsSync(path)) {
          mutations.push(fs.readFileSync(path).toString().trim());
        }
      });
      fs.appendFileSync(file, mutations.join(",\n"));
    } else {
      actionsArr.forEach((act) => {
        fs.appendFileSync(file, `  [${act}](state, payload) {\n    console.log(state, payload);\n  },\n`);
      });
    }
    fs.appendFileSync(file, '};\n');
    console.log('Created mutations.js');
  });
};

const create = ({ name, actions, crud }) => {
  const destFolder = `src/features/${name}/store`;

  const TYPES_FILE = `${destFolder}/types.js`;
  const INDEX_FILE = `${destFolder}/index.js`;
  const ACTIONS_FILE = `${destFolder}/actions.js`;
  const MUTATIONS_FILE = `${destFolder}/mutations.js`;

  const actionsArr = [];

  if (crud) {
    actionsArr.push(...[
      'GET_ITEM_LIST',
      'GET_ITEM',
      'SAVE_ITEM',
      'DELETE_ITEM',
      'RESET_ITEM',
      'CHANGE_PAGE',
      'CHANGE_PAGE_SIZE',
      'RESET_LIST',
    ]);
  } else if (actions) {
    actionsArr.push(...actions.split(','));
  }

  utils.mkdir(destFolder);

  createIndexFile(INDEX_FILE);

  if (!crud) {
    createTypesFile(TYPES_FILE, actionsArr);
  }

  createActionsFile(ACTIONS_FILE, actionsArr, crud);

  createMutationsFile(MUTATIONS_FILE, actionsArr, crud);

  console.log('Done!!');
};

module.exports = {
  create,
};
