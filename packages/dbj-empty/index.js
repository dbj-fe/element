import DbjEmpty from './src/dbjEmpty';

/* istanbul ignore next */
DbjEmpty.install = function(Vue) {
  Vue.component(DbjEmpty.name, DbjEmpty);
};

export default DbjEmpty;
