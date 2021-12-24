import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Normal Property animation event.', async () => {
  const element = useElement('div');

  const callback = jest.fn();

  wS(element, 0.2)('opacity', [1, 0]).on('opacity', callback);
  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });

  expect(callback).toBeCalled();
});

test('Normal Property animation event(Stop animation property).', async () => {
  const element = useElement('div');
  const opacityValue = getComputedStyle(element).getPropertyValue('opacity');
  const callback = jest.fn();

  wS(element, 0.2)('opacity', [1, 0]).on('opacity', () => {
    callback();
    return false;
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });

  expect(getComputedStyle(element).getPropertyValue('opacity')).toBe(
    opacityValue
  );
});
