import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Jump animation action.', async () => {
  const element = useElement('div');

  const performer = wS(element, 10)('top', [0, 300]);

  let topValueAfterJump: string = '';

  setTimeout(() => {
    performer.jump(0.5);
    /**
     * Wait for the execution of the requestAnimationFrame.
     */
    setTimeout(() => {
      topValueAfterJump = getComputedStyle(element).getPropertyValue('top');
    }, 100);
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(parseFloat(topValueAfterJump)).toBeGreaterThanOrEqual(150);
});
