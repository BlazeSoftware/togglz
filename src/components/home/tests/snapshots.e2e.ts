import { newE2EPage } from '@stencil/core/dist/testing';

describe('home-page', () => {
  test('renders correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<home-page></home-page>');
    const element = await page.find('home-page');

    await page.waitForChanges();

    expect(element.outerHTML).toMatchSnapshot();
  });
});
