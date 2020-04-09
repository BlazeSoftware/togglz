import drawerTests from '../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-downgrade-plan')(
  'delete environment',
  `<account-downgrade-plan user=${user}></account-downgrade-plan>`
);
