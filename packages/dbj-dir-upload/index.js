import DbjDirUpload from '../dbj-upload/src/dbjDirUpload';

DbjDirUpload.install = function(Vue, props) {
  Vue.component(DbjDirUpload.name, props ? {extends: DbjDirUpload, props: props} : DbjDirUpload);
};

export default DbjDirUpload;
