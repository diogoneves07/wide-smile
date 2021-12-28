import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Dur animation property.', async () => {
  const element = useElement('div');
  const callback = jest.fn();
  const time = new Date().getTime();
  let currentTime: number = 0;
  wS(element, 1)('left', [0, 100]).on('end', () => {
    callback();
    currentTime = new Date().getTime() - time;
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 1500);
  });

  expect(currentTime).toBeGreaterThanOrEqual(1000);
});
