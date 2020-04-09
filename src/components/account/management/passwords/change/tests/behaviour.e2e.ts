import drawerTests from '../../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-change-password')(
  'delete environment',
  `<account-change-password user=${user}></account-change-password>`
);
