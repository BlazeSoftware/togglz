import snapIt from '../../../../../test/snap-it';

describe('delete environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-delete')('renders correctly', `<account-delete user=${user}></account-delete>`);
});
