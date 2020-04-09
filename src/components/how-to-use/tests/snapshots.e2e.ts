import snapIt from '../../../test/snap-it';

describe('how to use', () => {
  const snap = snapIt('how-to-use');
  snap('renders without apikey', '<how-to-use></how-to-use>');
  snap('renders with apikey', '<how-to-use apiKey="thisisanapikey123"></how-to-use>');
});
