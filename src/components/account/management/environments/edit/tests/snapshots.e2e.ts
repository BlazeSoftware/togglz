import snapIt from '../../../../../../test/snap-it';

describe('edit environment', () => {
  const user = {
    email: 'another@dot.com',
  };

  snapIt('account-edit-environment')(
    'renders correctly',
    `<account-edit-environment user=${user}></account-edit-environment>`
  );
});
