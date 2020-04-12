import snapIt from '../../../../../test/snap-it';

describe('add environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-add-environment')(
    'renders correctly',
    `<account-add-environment user=${user}></account-add-environment>`
  );
});
