import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Restart animation action.', async () => {
  const element = useElement('div');
  const callback = jest.fn();

  let topValueBeforeRestart = '';
  let topValueAfterRestart = '';

  const performer = wS(element, 5)('top', [0, 300]).on('loopStart', callback);

  setTimeout(() => {
    topValueBeforeRestart = getComputedStyle(element).getPropertyValue('top');
    performer.restart();

    /**
     * Wait for the execution of the requestAnimationFrame.
     */
    setTimeout(() => {
      topValueAfterRestart = getComputedStyle(element).getPropertyValue('top');
    }, 100);
  }, 500);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1300);
  });

  expect(parseFloat(topValueBeforeRestart)).toBeGreaterThan(
    parseFloat(topValueAfterRestart)
  );
  expect(callback).toBeCalledTimes(2);
});
