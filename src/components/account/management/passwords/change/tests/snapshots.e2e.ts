import snapIt from '../../../../../../test/snap-it';

describe('delete environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-change-password')(
    'renders correctly',
    `<account-change-password user=${user}></account-change-password>`
  );
});
