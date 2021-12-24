import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Loop animation property.', async () => {
  const element = useElement('div');
  const callback = jest.fn();

  wS(element, 0.1, 3)('left', [0, 100]).on('loopEnd', callback);

  await new Promise((resolve) => {
    return setTimeout(resolve, 600);
  });

  expect(callback).toBeCalledTimes(3);
});
