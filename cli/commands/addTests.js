const fs = require('fs');
const snakeCase = require('lodash.snakeCase');

const createMutationsTestFile = (name, actionsArr) => {

  let tests = '';
  let imports = '';
  const mutationsTestFileName = `${name}.mutations.spec.js`;
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/test/mutations.spec.js', mutationsTestFileName);

  if(actionsArr.length > 0){
    imports += 'import { ';
    actionsArr.forEach((act) => {
      imports += snakeCase(act).toUpperCase() + ", ";
      tests +=
        "   it('"+snakeCase(act).toUpperCase()+" mutation changes state correctly', () => {\n"+
        "     /*Test placeholder*/\n" +
        "   });\n";
    });
    imports += "} from '../types';\n"
  }

  let mutationsTestFileContent = fs.readFileSync(mutationsTestFileName, 'utf-8');
  mutationsTestFileContent = mutationsTestFileContent.replace(/\%TYPES_IMPORT\%/g, imports);
  mutationsTestFileContent = mutationsTestFileContent.replace(/\%TESTS\%/g, tests);
  fs.writeFileSync(mutationsTestFileName, mutationsTestFileContent);

  console.log('Created mutations test file!');
};

const createActionsTestFile = (name, actionsArr) => {

  let tests = '';
  let imports = '';
  const actionsTestFileName = `${name}.actions.spec.js`;
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/test/actions.spec.js', actionsTestFileName);

  if(actionsArr.length > 0){
    imports += 'import { ';
    actionsArr.forEach((act) => {
      imports += snakeCase(act).toUpperCase() + ", ";
      tests +=
        "   it('"+act+" action commits the right mutation', () => {\n"+
        "     /*Test placeholder*/\n" +
        "   });\n";
    });
    imports += "} from '../types';\n"
  }

  let actionsTestFileContent = fs.readFileSync(actionsTestFileName, 'utf-8');
  actionsTestFileContent = actionsTestFileContent.replace(/\%TYPES_IMPORT\%/g, imports);
  actionsTestFileContent = actionsTestFileContent.replace(/\%TESTS\%/g, tests);
  fs.writeFileSync(actionsTestFileName, actionsTestFileContent);

  console.log('Created actions test file!');
};

const createComponentsTestFile = (destFolder,  name) => {

  let componentsTestFileName = `${destFolder+name}.components.spec.js`;
  fs.copyFileSync('node_modules/@apok/admin/cli/templates/test/components.spec.js', componentsTestFileName);

  let componentsTestFileContent = fs.readFileSync(componentsTestFileName, 'utf-8');
  componentsTestFileContent = componentsTestFileContent.replace(/\%MODULE_NAME\%/g, name);
  fs.writeFileSync(componentsTestFileName, componentsTestFileContent);

  console.log('Created components test file!');
};

module.exports = {
  createMutationsTestFile,
  createActionsTestFile,
  createComponentsTestFile,
};
