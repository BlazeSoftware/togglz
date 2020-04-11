import snapIt from '../../../../../../test/snap-it';

describe('delete environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-change-email')('renders correctly', `<account-change-email user=${user}></account-change-email>`);
});
