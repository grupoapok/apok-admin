import NetworkPlugin from "./network/NetworkPlugin";

export default {
  install(vue, options) {
    let componentsPath = false;
    if (options.components === 'Bulma') {
      componentsPath = "~@apok/admin-components-bulma/components"
    } else if (componentsPath === 'Bootstrap') {
      componentsPath = "~@apok/admin-components-bootstrap/components"
    }
    if (componentsPath) {
      const requireComponents = require.context(componentsPath, false, /\.vue$/);

      requireComponents.keys().forEach(fileName => {
        const comp = requireComponents(fileName).default;
        Vue.component(comp.name, comp)
      });
    }

    if (options.network){
      vue.use(NetworkPlugin, options.network);
    }
  }
}
