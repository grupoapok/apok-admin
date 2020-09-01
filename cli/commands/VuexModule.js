const fs = require('fs');
const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakeCase')
const utils = require('../utils/index');
const testFiles =  require('./addTests');

const createIndexFile = (indexFile, crud) => {

  let imports = '';
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/vuex/index.js', indexFile);
  let indexFileContent = fs.readFileSync(indexFile, 'utf-8');
  if(crud){
    imports +=
      "import { storeGenerator } from '@/store/base/baseStore';\n" +
      "const userStore = storeGenerator(actions, initialState, mutations);\n" +
      "export default userStore;\n"
  } else {
    imports +=
      "export default {\n\tstate: initialState,\n\tactions,\n\tmutations,\n};\n"
  }
  indexFileContent = indexFileContent.replace(/\%CRUD\%/g, imports);
  fs.writeFileSync(indexFile, indexFileContent)
  console.log('Created index.js');
};

const createTypesFile = (typesFile, actionsArr) => {
  let types = '';
  fs.open(typesFile, 'w', (err, file) => {
    if (err) { throw err; }
    actionsArr.forEach((a) => {
      types += `export const ${snakeCase(a).toUpperCase()} = '${a}';\n`;
    });
    fs.appendFileSync(file, types);
  });
  console.log('Created types.js');
};

const createActionsFile = (actionsFile, actionsArr, crud) => {

  let typesImport = '';
  let actions = '';

  if(actionsArr.length > 0){
    let separator = '';
    typesImport += "import {";
    if(actionsArr.length >= 5){
      separator = '\n\t';
    } else {
      separator = ' ';
    }
    typesImport += separator;
    actionsArr.forEach((action) => {
      const actionName = camelCase(action);
      const mutationType = snakeCase(action).toUpperCase();
      actions += `\nexport const ${actionName} = (context) => {\n\tcontext.commit(${mutationType});\n};\n`;
      typesImport += mutationType + ',' + separator;
    });
    typesImport += "\r} from './types';\n"
  }
  if(crud) {
    typesImport +=
      "import Vue from 'vue';\n" +
      "import {\n" +
      "  CHANGE_PAGE,\n" +
      "  CHANGE_PAGE_SIZE,\n" +
      "  DELETE_ITEM,\n" +
      "  GET_ITEM,\n" +
      "  GET_ITEM_LIST,\n" +
      "  RESET_ITEM,\n" +
      "  RESET_LIST,\n" +
      "  SAVE_ITEM,\n" +
      "} from '@/store/ListTypes';\n\n";
    const path = "node_modules/@apok/admin/cli/templates/vuex/actions.js";
    actions += "\n" + fs.readFileSync(path, 'utf-8');
  }

  fs.open(actionsFile, 'w', (err, file) => {
    fs.writeFileSync(file, typesImport+actions)
  });
  console.log('Created actions.js');
};

const createMutationsFile = (mutationsFile, actionsArr) => {

  let typesImport = '';
  let mutations = '';
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/vuex/mutations.js', mutationsFile);
  let mutationsFileContent = fs.readFileSync(mutationsFile, 'utf-8');

  if(actionsArr.length > 0){
    let separator = '';
    typesImport += 'import {';
    if(actionsArr.length >= 5){
      separator = '\n\t';
    } else {
      separator = ' ';
    }
    typesImport += separator;
    actionsArr.forEach((type) => {
      let mutationType = snakeCase(type).toUpperCase();
      typesImport += mutationType + ',' + separator;
      mutations += `\t[${mutationType}](state, payload) {\n\t\tconsole.log(state, payload);\n\t},\n`
    });
    typesImport += "\r} from './types';\n";
  }

  mutationsFileContent = mutationsFileContent.replace(/\%TYPES_IMPORT\%/g, typesImport);
  mutationsFileContent = mutationsFileContent.replace(/\%MUTATIONS\%/g, mutations);
  fs.writeFileSync(mutationsFile, mutationsFileContent);
  console.log('Created mutations.js');
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
    const testDestFolder = `src/features/${name}/__tests__`;
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
