import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Execution time animation event.', async () => {
  const element = useElement('div');

  const callback = jest.fn();
  wS(element, 0.5)('opacity', [1, 0]).on('0.1s', callback);
  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(callback).toBeCalledTimes(1);
});
