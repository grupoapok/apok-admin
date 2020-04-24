import Empty from "../../components/Empty";

const components = {
    layoutRenderer: Empty
};

const AdminComponents = {
    install: function (vue, options) {
        const componentsToRegister = {
            ...components,
            ...options
        };
        Object.keys(componentsToRegister).forEach(component => {
            vue.component(component, componentsToRegister[component])
        });
    }
};

export default AdminComponents
