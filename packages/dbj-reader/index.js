import DbjReader from '../dbj-upload/src/dbjReader';

DbjReader.install = function(Vue) {
  Vue.component(DbjReader.name, DbjReader);
};

export default DbjReader;
