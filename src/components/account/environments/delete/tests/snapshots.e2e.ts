import snapIt from '../../../../../test/snap-it';

describe('delete environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-delete-environment')(
    'renders correctly',
    `<account-delete-environment user=${user}></account-delete-environment>`
  );
});
