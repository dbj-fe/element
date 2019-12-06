import DbjUploadImage from '../dbj-upload/src/dbjUploadImage';

DbjUploadImage.install = function(Vue, props) {
  Vue.component(DbjUploadImage.name, props ? {extends: DbjUploadImage, props: props} : DbjUploadImage);
};

export default DbjUploadImage;

