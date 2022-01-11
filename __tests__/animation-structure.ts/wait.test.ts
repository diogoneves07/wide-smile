import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Wait animation structure.', async () => {
  const element = useElement('div');

  let topValue = '';
  wS(element, 0.5)('top', [0, 50])
    .wait('0.25s')('width', [0, 100])
    .on('loopStart', function a() {
      topValue = getComputedStyle(element).getPropertyValue('top');
    });

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  expect(parseFloat(topValue)).toBeGreaterThanOrEqual(25);
});
