import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

const element = useElement('div');

test('Load animation event.', async () => {
  const callback = jest.fn();
  wS(element, 0.2)('opacity', [1, 0]).on('load', callback);
  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(callback).toBeCalledTimes(1);
});
