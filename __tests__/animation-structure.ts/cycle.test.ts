import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Cycle animation structure("alternate").', async () => {
  const element = useElement('div');

  const callback = jest.fn();

  wS(element, 0.1)
    .cycle('alternate')
    ._('top', [0, 50])
    ._('width', [0, 150])
    .on('loopEnd', callback);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  expect(callback).toBeCalledTimes(2);

  expect(parseFloat(getComputedStyle(element).getPropertyValue('top'))).toBe(0);
  expect(parseFloat(getComputedStyle(element).getPropertyValue('width'))).toBe(
    0
  );
});

test('Cycle animation structure("normal").', async () => {
  const element = useElement('div');

  const callback = jest.fn();

  wS(element, 0.1)
    .cycle('normal')
    ._('top', [0, 50])
    ._('width', [0, 150])
    .on('loopEnd', callback);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  expect(callback).toBeCalledTimes(2);

  expect(parseFloat(getComputedStyle(element).getPropertyValue('top'))).toBe(
    50
  );
  expect(parseFloat(getComputedStyle(element).getPropertyValue('width'))).toBe(
    150
  );
});
