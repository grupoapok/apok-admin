const snakeCase = require('lodash.snakecase');
const capitalize = require('lodash.capitalize');
const camelCase = require('lodash.camelcase');
const fs = require('fs');
const vuexModule = require('./VuexModule');
const testFiles = require('./addTests');
const utils = require('../utils/index');

const createEntryComponent = (entryPageFile, name) => {
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/admin/PageEntry.vue', entryPageFile);
  let entryPageContent = fs.readFileSync(entryPageFile, 'utf-8');
  entryPageContent = entryPageContent.replace(/\%MODULE_NAME\%/g, name);
  fs.writeFileSync(entryPageFile, entryPageContent);
  console.log("Created entry component!");
};

const createListComponent = (listPageFile, moduleName, vuexModule, crudObject) => {
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/admin/PageList.vue', listPageFile);
  let listPageContent = fs.readFileSync(listPageFile, 'utf-8');
  listPageContent = listPageContent.replace(/\%MODULE_NAME\%/g, moduleName);
  listPageContent = listPageContent.replace(/\%VUEX_MODULE\%/g, vuexModule);
  listPageContent = listPageContent.replace(/\%CRUD_OBJECT\%/g, crudObject);
  fs.writeFileSync(listPageFile, listPageContent);
  console.log("Created list component!")
};

const createEditComponent = (editPageFile, moduleName, vuexModule, crudObject, crudObjectVar) => {
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/admin/PageEdit.vue', editPageFile);
  let editPageContent = fs.readFileSync(editPageFile, 'utf-8');
  editPageContent = editPageContent.replace(/\%MODULE_NAME\%/g, moduleName);
  editPageContent = editPageContent.replace(/\%VUEX_MODULE\%/g, vuexModule);
  editPageContent = editPageContent.replace(/\%CRUD_OBJECT\%/g, crudObject);
  editPageContent = editPageContent.replace(/\%CRUD_OBJECT_VAR\%/g, crudObjectVar);
  fs.writeFileSync(editPageFile, editPageContent);
  console.log("Created edit component!")
};

const createRoutesFile = (routesFile, moduleName) => {
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/admin/PageRoutes.js', routesFile);
  let routesFileContent = fs.readFileSync(routesFile, 'utf-8');
  routesFileContent = routesFileContent.replace(/\%MODULE_NAME\%/g, moduleName);
  routesFileContent = routesFileContent.replace(/\%MODULE_NAME_LOWER\%/g, moduleName.toLowerCase());
  fs.writeFileSync(routesFile, routesFileContent);
  console.log("Created routes file!")
};

const create = ({ name, vuex, vuexVar, createVuex, withTests }) => {
  if (createVuex) {
    vuexModule.create({
      name,
      crud: createVuex,
      withTests
    });
    vuex = name;
  }else if(vuex){
    vuexModule.create({
      name,
      actions: 'ACTION_NAME_PLACEHOLDER',
      withTests,
    });
  }

  const destFolder = `src/features/${name}`;

  utils.mkdir(destFolder);
  utils.mkdir(`${destFolder}/views`);

  const ENTRY_PAGE_FILE = `${destFolder}/views/${name}.vue`;
  const LIST_PAGE_FILE = `${destFolder}/views/${name}List.vue`;
  const EDIT_PAGE_FILE = `${destFolder}/views/${name}Edit.vue`;
  const ROUTES_FILE = `${destFolder}/routes.js`;

  createEntryComponent(ENTRY_PAGE_FILE, name);
  createListComponent(LIST_PAGE_FILE, name, vuex, capitalize(vuexVar));
  createEditComponent(EDIT_PAGE_FILE, name, vuex, capitalize(vuexVar), camelCase(vuexVar));
  createRoutesFile(ROUTES_FILE, name);
  fs.writeFileSync(`${destFolder}/form.js`, 'export default [];');
  fs.writeFileSync(`${destFolder}/${name}.i18n.js`, 'export default {};');

  if(withTests){
    const testDestFolder = `src/features/${name}/__tests__/`;
    utils.mkdir(testDestFolder);
    testFiles.createComponentsTestFile(testDestFolder, name);
  }
};

module.exports = {
  create,
};
