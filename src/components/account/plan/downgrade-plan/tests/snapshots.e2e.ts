import snapIt from '../../../../../test/snap-it';

describe('delete environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-downgrade-plan')(
    'renders correctly',
    `<account-downgrade-plan user=${user}></account-downgrade-plan>`
  );
});
