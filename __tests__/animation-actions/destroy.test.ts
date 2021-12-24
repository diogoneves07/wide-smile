import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Destroy animation action(With removeChanges).', async () => {
  const element = useElement('div');

  const callback = jest.fn();

  const performer = wS(element, 1)('top', [0, 300]).on('end', callback);

  let topValue: string = '';
  setTimeout(() => {
    topValue = getComputedStyle(element).getPropertyValue('top');
    performer.destroy(true);
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 2000);
  });

  expect(getComputedStyle(element).getPropertyValue('top')).not.toBe(topValue);
  expect(callback).not.toBeCalled();
});

test('Destroy animation action(Without removeChanges).', async () => {
  const element = useElement('div');

  const callback = jest.fn();

  const performer = wS(element, 1)('top', [0, 300]).on('end', callback);

  let topValue: string = '';
  setTimeout(() => {
    topValue = getComputedStyle(element).getPropertyValue('top');
    performer.destroy();
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 2000);
  });

  expect(getComputedStyle(element).getPropertyValue('top')).toBe(topValue);
  expect(callback).not.toBeCalled();
});
