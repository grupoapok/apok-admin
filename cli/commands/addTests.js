const fs = require('fs');
const snakeCase = require('lodash.snakeCase')

const createMutationsTestFile = (name, actionsArr) => {

  fs.open(`${name}.mutations.spec.js`, 'w', (err, file) => {
    fs.appendFileSync(file, "import store from '../store'\n\n");
    fs.appendFileSync(file, "/*Initial tests for every mutation in module*/\n");
    fs.appendFileSync(file, "describe(\"Initial tests for mutations\", () => {\n");
    actionsArr.forEach((act) => {
      fs.appendFileSync(file, "   it('"+snakeCase(act).toUpperCase()+" test', () => {\n"+
        "     /*Test placeholder*/\n" +
        "   });\n\n");
    });
    fs.appendFileSync(file, "});\n");
    console.log('Created mutations test file!');
  });
};

const createActionsTestFile = (name, actionsArr) => {

  fs.open(`${name}.actions.spec.js`, 'w', (err, file) => {
    fs.appendFileSync(file, "import store from '../store'\n\n");
    fs.appendFileSync(file, "/*Initial tests for every actions in module*/\n");
    fs.appendFileSync(file, "describe(\"Initial tests for actions\", () => {\n");
    actionsArr.forEach((act) => {
      fs.appendFileSync(file, "   it('"+act+" test', () => {\n"+
        "     /*Test placeholder*/\n" +
        "   });\n\n");
    });
    fs.appendFileSync(file, "});\n");
    console.log('Created actions test file!');
  });
};

const createComponentsTestFile = (destFolder,  name) => {

  fs.open(`${destFolder+name}.components.spec.js`, 'w', (err, file) => {
    fs.appendFileSync(file, "import { mount, shallowMount } from '@vue/test-utils'\n");
    fs.appendFileSync(file, `import ${name} from 'src/features/${name}/views/${name}.vue'\n`);
    fs.appendFileSync(file, `import ${name}List from 'src/features/${name}/views/${name}List.vue'\n`);
    fs.appendFileSync(file, `import ${name}Edit from 'src/features/${name}/views/${name}Edit.vue'\n\n`);

    fs.appendFileSync(file, `describe('Initial tests for ${name} component in module', () => {\n` +
      "  it('Placeholder unit test', () => {\n" +
      "    /*Placeholder*/\n" +
      "  });\n" +
      "});\n\n"
    );
    fs.appendFileSync(file, `describe('Initial tests for ${name}List component in module', () => {\n` +
      "  it('Placeholder unit test', () => {\n" +
      "    /*Placeholder*/\n" +
      "  });\n" +
      "});\n\n"
    );
    fs.appendFileSync(file, `describe('Initial tests for ${name}Edit component in module', () => {\n` +
      "  it('Placeholder unit test', () => {\n" +
      "    /*Placeholder*/\n" +
      "  });\n" +
      "});\n\n"
    );
  });
  console.log('Created components test file!');
};

module.exports = {
  createMutationsTestFile,
  createActionsTestFile,
  createComponentsTestFile,
};
