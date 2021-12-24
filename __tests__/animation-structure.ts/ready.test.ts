import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Ready animation structure.', async () => {
  const element = useElement('div');

  const callback = jest.fn();
  const values = [
    getComputedStyle(element).getPropertyValue('top'),
    getComputedStyle(element).getPropertyValue('color'),
    getComputedStyle(element).getPropertyValue('width'),
  ];
  let checkValue: typeof values = [];
  wS(
    element,
    1,
    false
  )('top', [0, 50])('color', ['blue', 'red'])('width', [0, 50])
    .on('load', () => {
      callback();

      checkValue.push(
        getComputedStyle(element).getPropertyValue('top'),
        getComputedStyle(element).getPropertyValue('color'),
        getComputedStyle(element).getPropertyValue('width')
      );
    })
    .ready();

  await new Promise((resolve) => {
    return setTimeout(resolve, 400);
  });

  expect(callback).toBeCalledTimes(1);

  expect(checkValue).toEqual(values);
});
