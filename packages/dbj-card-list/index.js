import DbjCardList from './src/dbjCardList';

/* istanbul ignore next */
DbjCardList.install = function(Vue) {
  Vue.component(DbjCardList.name, DbjCardList);
};

export default DbjCardList;
