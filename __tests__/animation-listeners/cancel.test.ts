import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

const element = useElement('div');

test('Cancel animation event.', async () => {
  const callback = jest.fn();
  const performer = wS(element, 10)('opacity', [1, 0]).on('cancel', callback);

  setTimeout(() => {
    performer.cancel();
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(callback).toBeCalledTimes(1);
});
