import { newE2EPage, E2EElement } from '@stencil/core/testing';

export default (tag) => (testName, html) =>
  describe(testName, () => {
    let el: E2EElement;
    let drawer: E2EElement;

    beforeEach(async () => {
      const page = await newE2EPage();
      await page.setContent(html);

      el = await page.find(tag);
      drawer = await el.find('blaze-drawer');
    });

    test('show opens drawer', async () => {
      await el.callMethod('show');
      const isOpen = await drawer.callMethod('isOpen');
      expect(isOpen).toEqual(true);
    });

    test('close closes drawer', async () => {
      await el.callMethod('close');
      const isOpen = await drawer.callMethod('isOpen');
      expect(isOpen).toEqual(false);
    });
  });
