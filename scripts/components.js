const { prompt } = require('enquirer');
const { exec } = require('child_process');
const fs = require('fs');

const installComponents = (framework) => {
  exec(`npm install --save @apok/admin-components-${framework.toLowerCase()}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  })
};

const adminConfig = (framework, network) => {
  let networkConfig = '{\n';
  if (network === 'REST' || network === 'Both') {
    networkConfig += `    rest: { baseUrl: '', sessionCookie: '' },
`
  }
  if (network === 'GraphQL' || network === 'Both') {
    networkConfig += `    graphql: { baseUrl: '', sessionCookie: '' },
`
  }
  networkConfig += '  }';

  const content = `import ApokAdminPlugin from '~@apok/admin/vue/plugins/ApokAdminPlugin'

Vue.use(ApokAdminPlugin, {
  components: '${framework}',
  network: ${networkConfig},
});`;

  const pwd = process.env.INIT_CWD;
  fs.writeFileSync(`${pwd}/src/config/admin.js`, content);
};

const questions = [
  {
    type: 'select',
    name: 'framework',
    message: 'CSS Framework',
    choices: ['Bootstrap', 'Bulma'],
    initial: 'Bootstrap',
    pointer: '›'
  },
  {
    type: 'select',
    name: 'network',
    message: 'Network Client',
    choices: ['REST', 'GraphQL', 'Both'],
    initial: 'REST',
    pointer: '›'
  }
];

prompt(questions).then((answers) => {
  installComponents(answers.framework);
  adminConfig(answers.framework, answers.network);
}).catch(console.log);
