import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

const element = useElement('div');

test('Loop start animation event.', async () => {
  const callback = jest.fn();
  wS(element, 0.2, 2)('opacity', [1, 0]).on('loopStart', callback);
  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(callback).toBeCalledTimes(2);
});
