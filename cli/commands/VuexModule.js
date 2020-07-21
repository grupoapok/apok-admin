const fs = require('fs');
const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakeCase')
const utils = require('../utils/index');
const testFiles =  require('./addTests');

const createIndexFile = (indexFile, crud) => {
  fs.open(indexFile, 'w', (err, file) => {
    if (err) { throw err; }
    fs.appendFileSync(file, 'import * as actions from \'./actions\';\n');
    fs.appendFileSync(file, 'import { initialState, mutations } from \'./mutations\';\n');
    if(crud){
      fs.appendFileSync(file, 'import { storeGenerator } from \'@/store/base/baseStore\';\n');
      fs.appendFileSync(file, 'const userStore = storeGenerator(actions, initialState, mutations);\n');
      fs.appendFileSync(file, 'export default userStore;\n');
    }else{
      fs.appendFileSync(file, 'export default {\n\tstate: initialState,\n\tactions,\n\tmutations,\n};\n');
    }
  });
  console.log('Created index.js');
};

const createTypesFile = (typesFile, actionsArr) => {
  fs.open(typesFile, 'w', (err, file) => {
    if (err) { throw err; }
    actionsArr.forEach((a) => {
      fs.appendFileSync(file, `export const ${snakeCase(a).toUpperCase()} = '${a}';\n`);
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

  let actionsForImport = "";
  actionsArr.forEach((a) => {
    actionsForImport += snakeCase(a).toUpperCase() + separator
  });

  fs.open(actionsFile, 'w', (err, file) => {
    fs.appendFileSync(file, 'import Vue from \'vue\';\n');
    if(actionsForImport.length > 0){
      fs.appendFileSync(file, `import {${actionsStart}${actionsForImport}${actionsEnd}} from './types';\n\n`);
    }
    fs.appendFileSync(file, 'import { processError } from "@/utils/functions";\n');

    if(actionsArr){
      actionsArr.forEach((act) => {
        const actionName = camelCase(act);
        const mutationName = snakeCase(act).toUpperCase();
        fs.appendFileSync(file, `\nexport const ${actionName} = (context) => {\n  context.commit(${mutationName});\n};\n`);
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
    actionsStart = '\n';
  }

  let actionsForImport = "";
  actionsArr.forEach((a)=>{
    actionsForImport += snakeCase(a).toUpperCase() + separator
  });

  fs.open(mutationsFile, 'w', (err, file) => {
    if (actionsForImport.length > 0) {
      fs.appendFileSync(file, `import {${actionsStart}${actionsForImport}${actionsEnd}} from './types';\n\n`);
    }

    fs.appendFileSync(file, 'export const initialState = {\n');
    fs.appendFileSync(file, '};\n\n');
    fs.appendFileSync(file, 'export const mutations = {\n');
    actionsArr.forEach((act) => {
      const mutationName = snakeCase(act).toUpperCase()
      fs.appendFileSync(file, `  [${mutationName}](state, payload) {\n    console.log(state, payload);\n  },\n`);
    });
    fs.appendFileSync(file, '};\n\n');
    console.log('Created mutations.js');
  });
};

const create = ({ name, actions, crud, withTests }) => {

  const destFolder = `src/features/${name}/store`;
  const TYPES_FILE = `${destFolder}/types.js`;
  const INDEX_FILE = `${destFolder}/index.js`;
  const ACTIONS_FILE = `${destFolder}/actions.js`;
  const MUTATIONS_FILE = `${destFolder}/mutations.js`;

  const actionsArr = [];

  utils.mkdir(destFolder);

  if(actions){
    actionsArr.push(...actions.split(','));
    if (actions[0].trim() !== '') {
      createTypesFile(TYPES_FILE, actionsArr);
    }
  }
  createIndexFile(INDEX_FILE, crud);
  createActionsFile(ACTIONS_FILE, actionsArr, crud);
  createMutationsFile(MUTATIONS_FILE, actionsArr, crud);

  if(withTests){
    const testDestFolder = `src/features/${name}/__tests__`
    const TEST_FILE = `${testDestFolder}/${name}`;
    utils.mkdir(testDestFolder);
    testFiles.createMutationsTestFile(TEST_FILE, actionsArr);
    testFiles.createActionsTestFile(TEST_FILE, actionsArr);
  }
  console.log('Done!!');
};

module.exports = {
  create,
};
