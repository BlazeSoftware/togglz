import drawerTests from '../../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-add-environment')(
  'add environment',
  `<account-add-environment user=${user}></account-add-environment>`
);
