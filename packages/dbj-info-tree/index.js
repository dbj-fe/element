import DbjInfoTree from './src/dbjInfoTree';

DbjInfoTree.install = function(Vue, props) {
  Vue.component(DbjInfoTree.name, props ? {extends: DbjInfoTree, props: props} : DbjInfoTree);
};

export default DbjInfoTree;
