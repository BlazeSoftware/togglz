import drawerTests from '../../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-delete-environment')(
  'delete environment',
  `<account-delete-environment user=${user}></account-delete-environment>`
);
