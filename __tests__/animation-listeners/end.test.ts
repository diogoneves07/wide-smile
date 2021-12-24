import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

const element = useElement('div');

test('End animation event.', async () => {
  const callback = jest.fn();
  wS(element, 0.1)('opacity', [1, 0]).on('end', callback);
  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(callback).toBeCalledTimes(1);
});
