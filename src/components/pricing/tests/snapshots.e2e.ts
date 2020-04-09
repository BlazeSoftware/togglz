import snapIt from '../../../test/snap-it';

describe('pricing', () => {
  const snap = snapIt('pricing-overview');
  snap('renders free plan correctly', '<pricing-overview plan="starter"></pricing-overview>');
  snap('renders pro plan correctly', '<pricing-overview plan="pro"></pricing-overview>');
});
