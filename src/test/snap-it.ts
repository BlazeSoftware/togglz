import { newE2EPage } from '@stencil/core/testing';

export default (tag) => (testName, html) =>
  test(testName, async () => {
    const page = await newE2EPage({ html });
    const element = await page.find(tag);

    await page.waitForChanges();

    expect(element.outerHTML).toMatchSnapshot();
  });
