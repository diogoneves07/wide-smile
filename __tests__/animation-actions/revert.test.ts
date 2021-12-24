import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Revert animation action(With endIteration).', async () => {
  const element = useElement('div');

  const performer = wS(element, 0.5)('top', [0, 300]);

  setTimeout(() => {
    performer.revert(true);
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(getComputedStyle(element).getPropertyValue('top')).toBe('0px');
});

test('Revert animation action(Without endIteration).', async () => {
  const element = useElement('div');
  const callback = jest.fn();

  let topValueAfterBack = '';

  let topValueBackComplete = '';

  let count = 0;
  const performer = wS(element, 0.5)('top', [0, 300]).on('loopEnd', () => {
    if (count === 0) {
      topValueBackComplete = getComputedStyle(element).getPropertyValue('top');
      count += 1;
    } else {
      topValueAfterBack = getComputedStyle(element).getPropertyValue('top');
    }
    callback();
  });

  setTimeout(() => {
    performer.revert();
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 2000);
  });

  expect(callback).toBeCalledTimes(2);

  expect(topValueBackComplete).toBe('0px');

  expect(topValueAfterBack).toBe('300px');
});
