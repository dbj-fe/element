import DbjDirUpload from '../dbj-upload/src/dbjDirUpload';

DbjDirUpload.install = function(Vue) {
  Vue.component(DbjDirUpload.name, DbjDirUpload);
};

export default DbjDirUpload;
