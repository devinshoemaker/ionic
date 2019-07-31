import { newE2EPage } from '@stencil/core/testing';

import { listenForEvent, waitForFunctionTestContext } from '../../../test/utils';

const navChanged = () => new Promise(resolve => window.addEventListener('ionRouteDidChange', resolve));
const ROUTE_CHANGED = 'onRouteChanged';

test('animation:backwards-compatibility animationbuilder', async () => {
  const page = await newE2EPage({ url: '/src/utils/animation/test/animationbuilder?ionic:_testing=true&_forceAnimationBuilder=true' });
  const screenshotCompares = [];

  const body = await page.$('body');
  await listenForEvent(page, 'ionRouteDidChange', body, ROUTE_CHANGED);
  const routeChangedCount: any = { count: 0 };
  await page.exposeFunction(ROUTE_CHANGED, () => {
    routeChangedCount.count += 1;
  });

  screenshotCompares.push(await page.compareScreenshot());

  page.click('page-root ion-button.next');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-one ion-button.next');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-two ion-button.next');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-three ion-back-button');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-two ion-back-button');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-one ion-back-button');
  await waitForNavChange(page, routeChangedCount);

  screenshotCompares.push(await page.compareScreenshot());
});

test('animation:backwards-compatibility animation', async () => {
  const page = await newE2EPage({ url: '/src/utils/animation/test/animationbuilder?ionic:_testing=true' });
  const screenshotCompares = [];

  const body = await page.$('body');
  await listenForEvent(page, 'ionRouteDidChange', body, ROUTE_CHANGED);
  const routeChangedCount: any = { count: 0 };
  await page.exposeFunction(ROUTE_CHANGED, () => {
    routeChangedCount.count += 1;
  });

  screenshotCompares.push(await page.compareScreenshot());

  page.click('page-root ion-button.next');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-one ion-button.next');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-two ion-button.next');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-three ion-back-button');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-two ion-back-button');
  await waitForNavChange(page, routeChangedCount);
  page.click('page-one ion-back-button');
  await waitForNavChange(page, routeChangedCount);

  screenshotCompares.push(await page.compareScreenshot());
});

const waitForNavChange = async (page, routeChangedCount) => {
  await waitForFunctionTestContext((payload: any) => {
    return payload.routeChangedCount.count === 1;
  }, { routeChangedCount });

  routeChangedCount.count = 0;
};
