import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Change animation event.', async () => {
  const element = useElement('div');

  const callback = jest.fn();
  wS(element, 0.2)('opacity', [1, 0]).on('change', callback);
  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(callback).toBeCalled();
});
