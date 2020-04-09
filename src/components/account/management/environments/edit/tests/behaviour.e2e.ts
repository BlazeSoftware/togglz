import drawerTests from '../../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-edit-environment')(
  'edit environment',
  `<account-edit-environment user=${user}></account-edit-environment>`
);
