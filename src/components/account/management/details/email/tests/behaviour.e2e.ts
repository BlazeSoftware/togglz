import drawerTests from '../../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-change-email')(
  'delete environment',
  `<account-change-email user=${user}></account-change-email>`
);
