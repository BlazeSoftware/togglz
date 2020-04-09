import snapIt from '../../../../test/snap-it';

describe('404', () => {
  snapIt('page-not-found')('renders correctly', '<page-not-found></page-not-found>');
});
