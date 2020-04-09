import drawerTests from '../../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-change-name')(
  'delete environment',
  `<account-change-name user=${user}></account-change-name>`
);
