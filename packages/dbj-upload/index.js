import DbjUpload from './src/dbjUpload';

DbjUpload.install = function(Vue, props) {
  Vue.component(DbjUpload.name, props ? {extends: DbjUpload, props: props} : DbjUpload);
};

export default DbjUpload;
