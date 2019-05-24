const snakeCase = require('lodash/snakeCase');
const capitalize = require('lodash/capitalize');
const camelCase = require('lodash/camelCase');
const fs = require('fs');
const vuexModule = require('./VuexModule');
const utils = require('../utils/index');

const createEntryComponent = (entryPageFile, name) => {
  fs.copyFileSync('cli/templates/PageEntry.vue', entryPageFile);
  let entryPageContent = fs.readFileSync(entryPageFile, 'utf-8');
  entryPageContent = entryPageContent.replace(/\%MODULE_NAME\%/g, name);
  fs.writeFileSync(entryPageFile, entryPageContent);
};

const createListComponent = (listPageFile, moduleName, vuexModule, crudObject) => {
  fs.copyFileSync('cli/templates/PageList.vue', listPageFile);
  let listPageContent = fs.readFileSync(listPageFile, 'utf-8');
  listPageContent = listPageContent.replace(/\%MODULE_NAME\%/g, moduleName);
  listPageContent = listPageContent.replace(/\%VUEX_MODULE\%/g, vuexModule);
  listPageContent = listPageContent.replace(/\%CRUD_OBJECT\%/g, crudObject);
  fs.writeFileSync(listPageFile, listPageContent);
};

const createEditComponent = (editPageFile, moduleName, vuexModule, crudObject, crudObjectVar) => {
  fs.copyFileSync('cli/templates/PageEdit.vue', editPageFile);
  let editPageContent = fs.readFileSync(editPageFile, 'utf-8');
  editPageContent = editPageContent.replace(/\%MODULE_NAME\%/g, moduleName);
  editPageContent = editPageContent.replace(/\%VUEX_MODULE\%/g, vuexModule);
  editPageContent = editPageContent.replace(/\%CRUD_OBJECT\%/g, crudObject);
  editPageContent = editPageContent.replace(/\%CRUD_OBJECT_VAR\%/g, crudObjectVar);
  fs.writeFileSync(editPageFile, editPageContent);
};

const createRoutesFile = (routesFile, moduleName) => {
  fs.copyFileSync('cli/templates/PageRoutes.js', routesFile);
  let routesFileContent = fs.readFileSync(routesFile, 'utf-8');
  routesFileContent = routesFileContent.replace(/\%MODULE_NAME\%/g, moduleName);
  routesFileContent = routesFileContent.replace(/\%MODULE_NAME_LOWER\%/g, moduleName.toLowerCase());
  fs.writeFileSync(routesFile, routesFileContent);
};

const create = ({
  name, vuex, vuexVar, createVuex
}) => {
  if (createVuex) {
    vuexModule.create({
      name,
      crud: snakeCase(vuexVar).toUpperCase(),
    });
    vuex = createVuex;
  }

  const destFolder = `src/features/${name}`;

  utils.mkdir(destFolder);
  utils.mkdir(`${destFolder}/views`);

  const ENTRY_PAGE_FILE = `${destFolder}/views/${name}.vue`;
  const LIST_PAGE_FILE = `${destFolder}/views/${name}List.vue`;
  const EDIT_PAGE_FILE = `${destFolder}/views/${name}Edit.vue`;
  const ROUTES_FILE = `${destFolder}/routes.js`;

  createEntryComponent(ENTRY_PAGE_FILE, name);
  createListComponent(LIST_PAGE_FILE, name, name, capitalize(vuexVar));
  createEditComponent(EDIT_PAGE_FILE, name, name, capitalize(vuexVar), camelCase(vuexVar));
  createRoutesFile(ROUTES_FILE, name);
  fs.writeFileSync(`${destFolder}/form.js`, 'export default [];');
  fs.writeFileSync(`${destFolder}/${name}.i18n.js`, 'export default {};');
};

module.exports = {
  create,
};
