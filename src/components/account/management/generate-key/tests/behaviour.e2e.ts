import drawerTests from '../../../../../test/drawer-tests';

const user = {
  email: 'another@dot.com',
};

drawerTests('account-generate-key')('generate key', `<account-generate-key user=${user}></account-generate-key>`);
