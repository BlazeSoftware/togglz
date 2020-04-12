import snapIt from '../../../../../test/snap-it';

describe('delete environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-generate-key')('renders correctly', `<account-generate-key user=${user}></account-generate-key>`);
});
