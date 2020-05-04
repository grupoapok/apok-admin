/*** archivo de prueba para posible implementacion futura (aun en desarrollo)
 *
 * La idea es manejar la configuracion del servicio (REST, GRAPHQL) en un solo archivo
 * y que manualmente el usuario ingrese directamente el endpoint en un archivo .env
 * para cada servicio
 *
 * ¡SUGERENCIA DE JOSÉ!*/

const NetworkPlugin = {
  install(vue, options) {
    vue.prototype.$loginClient = options.loginClient === 'rest' ? '$rest' : '$graph';
  }
};

export default NetworkPlugin
