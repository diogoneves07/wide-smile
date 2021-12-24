import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

const element = useElement('div');

test('Destroy animation event.', async () => {
  const callback = jest.fn();
  wS(element, 10)('opacity', [1, 0]).on('ready', callback);

  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(callback).toBeCalledTimes(1);
});
